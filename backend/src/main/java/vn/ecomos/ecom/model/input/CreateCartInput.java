package vn.ecomos.ecom.model.input;

import lombok.Data;
import vn.ecomos.ecom.model.cart.Cart;
import vn.ecomos.ecom.model.cart.CartItem;

import java.util.List;

@Data
public class CreateCartInput {
    private Cart cart;
    private List<CartItem> cartItemList;
}
