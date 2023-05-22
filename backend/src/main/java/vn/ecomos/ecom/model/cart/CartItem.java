package vn.ecomos.ecom.model.cart;

import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.model.product.ProductVariant;

@Data
public class CartItem extends BaseModel {
    private String cartId;
    private Integer shopId;
    private ProductVariant productVariant;
    private long quantity;
    private double totalPrice;
}
