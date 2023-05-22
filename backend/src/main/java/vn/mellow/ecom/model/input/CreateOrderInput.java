package vn.mellow.ecom.model.input;

import lombok.Data;
import vn.mellow.ecom.model.cart.CartItem;
import vn.mellow.ecom.model.order.Order;
import vn.mellow.ecom.model.order.OrderItem;

import java.util.List;

@Data
public class CreateOrderInput {
    private String userId;
    private boolean payment;
    private List<CartItem> cartItemInputs;

}
