package vn.ecomos.ecom.model.product;

import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.base.model.MoneyV2;
import vn.ecomos.ecom.utils.FulltextIndex;

import java.util.List;

@Data
public class Product extends BaseModel {
    @FulltextIndex
    private String name;
    private Integer shopId;
    private String industrialId;
    private String industrialTypeName;
    private String description;
    private String featuredImageUrl;
    private List<String> imageUrls;
    private MoneyV2 mediumPrice;
    private MoneyV2 salePrice;
    private String title;
    private long quantityAvailable;
    private double discount;
    //thương hiệu
    private String tradeMarkId;

}
