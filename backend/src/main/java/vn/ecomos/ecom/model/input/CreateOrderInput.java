package vn.ecomos.ecom.model.input;

import lombok.Data;
import vn.ecomos.ecom.model.cart.CartItem;

import java.util.List;

@Data
public class CreateOrderInput {
    private String userId;
    private boolean payment;
    private List<CartItem> cartItemInputs;

}
