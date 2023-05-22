package vn.ecomos.ecom.model.product;

import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.base.model.MoneyV2;
import vn.ecomos.ecom.enums.ColorProduct;
import vn.ecomos.ecom.enums.SizeType;
import vn.ecomos.ecom.model.input.WeightUnit;
import vn.ecomos.ecom.model.size.DimensionMeasurement;

@Data
public class ProductVariant extends BaseModel {
    private String imageUrl;
    private MoneyV2 price;
    private String productId;
    private String productName;
    private Integer quantityAvailable;
    private boolean requiresShipping;
    private String sku;
    private String title;
    private ColorProduct color;
    private SizeType size;
    private Double weight;
    private WeightUnit weightUnit;
    private DimensionMeasurement dimension;
    private MoneyV2 salePrice;
    private double discount;
}
