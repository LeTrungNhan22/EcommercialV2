package vn.mellow.ecom.ecommercefloor.manager;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.conversions.Bson;
import org.springframework.stereotype.Repository;
import vn.mellow.ecom.ecommercefloor.base.filter.ResultList;
import vn.mellow.ecom.ecommercefloor.base.manager.BaseManager;
import vn.mellow.ecom.ecommercefloor.model.industrial.IndustrialProduct;
import vn.mellow.ecom.ecommercefloor.model.product.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class ProductManager extends BaseManager {
    public ProductManager(MongoClient mongoClient) {
        super(mongoClient);
    }

    private MongoCollection<Product> productMongoCollection;

    public MongoCollection<Product> getProductCollection() {
        if (null == productMongoCollection) {
            productMongoCollection = getCollection(Product.class);
        }
        return productMongoCollection;
    }

    private MongoCollection<ProductVariant> variantMongoCollection;

    public MongoCollection<ProductVariant> getProductVariantCollection() {
        if (null == variantMongoCollection) {
            variantMongoCollection = getCollection(ProductVariant.class);
        }
        return variantMongoCollection;
    }

    public Product getProduct(String productId) {
        return getProductCollection().find(Filters.eq("_id", productId)).first();
    }

    public ProductVariant getProductVariant(String variantId) {
        return getProductVariantCollection().find(Filters.eq("_id", variantId)).first();

    }

    public List<ProductVariant> getProductVariants(String productId) {
        return getProductVariantCollection().
                find(Filters.eq("productId", productId)).into(new ArrayList<>());
    }

    public ProductDetail getProductDetail(String productId) {
        ProductDetail productDetail = new ProductDetail();
        Product product = getProduct(productId);
        List<ProductVariant> variants = getProductVariants(productId);
        if (null != variants) {
            productDetail.setVariants(variants);
        }
        productDetail.setProduct(product);
        return productDetail;


    }

    public ProductDetail createProduct(Product product, List<ProductVariant> variantList) {
        getProductCollection().insertOne(product);
        getProductVariantCollection().insertMany(variantList);
        return getProductDetail(product.getId());

    }

    //    xóa sản phẩm
//    public void deleteProduct(String productId) {
//        getProductCollection().deleteOne(Filters.eq("_id", productId));
//        getProductVariantCollection().deleteMany(Filters.eq("productId", productId));
//    }

    //nghành hàng
    private MongoCollection<IndustrialProduct> industrialProductMongoCollection;

    public MongoCollection<IndustrialProduct> getIndustrialProductCollection() {
        if (null == industrialProductMongoCollection) {
            industrialProductMongoCollection = getCollection(IndustrialProduct.class);
        }
        return industrialProductMongoCollection;
    }

    public IndustrialProduct createIndustrialProduct(IndustrialProduct industrialProduct) {
        industrialProduct.setCreatedAt(new Date());
        industrialProduct.setId(generateId());
        industrialProduct.setUpdatedAt(null);
        getIndustrialProductCollection().insertOne(industrialProduct);
        return industrialProduct;

    }

    public List<IndustrialProduct> getIndustrialProducts() {
        return getIndustrialProductCollection().find().into(new ArrayList<>());
    }

    public IndustrialProduct getIndustrialProduct(String name) {
        return getIndustrialProductCollection().find(Filters.eq("name", name)).first();

    }

    //Thương hiệu
    private MongoCollection<Trademark> trademarkMongoCollection;

    public MongoCollection<Trademark> getTrademarkCollection() {
        if (null == trademarkMongoCollection) {
            trademarkMongoCollection = getCollection(Trademark.class);
        }
        return trademarkMongoCollection;
    }

    public Trademark getTrademark(String trademarkId) {
        return getTrademarkCollection().find(Filters.eq("_id", trademarkId)).first();
    }

    public Trademark getTrademarkByIndustrialId(String industrialId) {
        return getTrademarkCollection().find(Filters.eq("industrialId", industrialId)).first();
    }


    public List<Trademark> getTradeMarks() {
        return getTrademarkCollection().find().into(new ArrayList<>());
    }

    public Trademark createTrademark(Trademark trademark) {
        trademark.setId(generateId());
        trademark.setCreatedAt(new Date());
        trademark.setUpdatedAt(null);
        getTrademarkCollection().insertOne(trademark);
        return trademark;
    }

    public ResultList<Product> filterProduct(ProductFilter productFilter) {
        List<Bson> filter = getFilters(productFilter);
        if (null != productFilter.getPriceFrom() &&
                null != productFilter.getPriceTo()) {
            betweenFilter("mediumPrice.amount", productFilter.getPriceFrom(), productFilter.getPriceTo(), filter);
        }
        if (null != productFilter.getTradeMarkId())
            appendFilter(productFilter.getTradeMarkId(), "tradeMarkId", filter);
        if (null != productFilter.getName())
            appendFilter(productFilter.getName(), "name", filter);
        if (null != productFilter.getShopId())
            appendFilter(productFilter.getShopId(), "shopId", filter);
        if (null != productFilter.getIndustrialId())
            appendFilter(productFilter.getIndustrialId(), "industrialId", filter);
        if (null != productFilter.getProductId())
            appendFilter(productFilter.getProductId(), "_id", filter);

        return getResultList(getProductCollection(), filter, productFilter.getOffset(), productFilter.getMaxResult());
    }
}