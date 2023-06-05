package vn.ecomos.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.manager.CartManager;
import vn.ecomos.ecom.manager.ProductManager;
import vn.ecomos.ecom.model.cart.Cart;
import vn.ecomos.ecom.model.cart.CartItem;
import vn.ecomos.ecom.model.product.Product;
import vn.ecomos.ecom.model.product.ProductVariant;

import java.util.List;

@Component
public class CreateCartController {

    @Autowired
    private ProductManager productManager;
    @Autowired
    private CartManager cartManager;

    public Cart createCart(Cart cart, List<CartItem> cartItems) throws EcomosException {
        //validate
        validateCartInput(cart, cartItems);

        return cartManager.createCart(cart, cartItems);
    }

    public CartItem createCartItem(CartItem cartItem) throws EcomosException {
        //validate cart input
        validateCartItemInput(cartItem);
        if (null == cartItem.getCartId()) {
            throw new EcomosException("not_found", "Vui lòng nhập thông tin mã giỏ hàng.", "cart id is not available");
        }
        ProductVariant variant = cartItem.getProductVariant();
        Product product = productManager.getProduct(variant.getProductId());
        Integer shopId = product.getShopId();
        cartItem.setShopId(shopId);
        Cart cart = cartManager.getCartById(cartItem.getCartId());
        CartItem cartItemExist = cartManager.getCartItem(cartItem.getCartId(), cartItem.getProductVariant().getId());
        // total discount
        double totalDiscount = cart.getTotalDiscount() + (cartItem.getQuantity() * (
                cartItem.getProductVariant().getPrice().getAmount() -
                        cartItem.getProductVariant().getSalePrice().getAmount()));
        // total current price
        double totalCurrentPrice = cart.getTotalCurrentPrice() + (cartItem.getQuantity() * (
                cartItem.getProductVariant().getPrice().getAmount()));
        if (null != cartItemExist) {
            cartManager.updateCartQuantity(cartItem.getCartId(),
                    //số lượng
                    cart.getTotalQuantity() + cartItem.getQuantity(),
                    totalDiscount
                    , totalCurrentPrice,
                    //tổng tiền
                    cart.getTotalPrice() + cartItem.getTotalPrice());
            return cartManager.updateQuantityCartItem(cartItemExist.getId(),
                    cartItem.getQuantity() + cartItemExist.getQuantity(),
                    cartItem.getTotalPrice() + cartItemExist.getTotalPrice());
        }

        cartManager.updateCartQuantity(cartItem.getCartId(),
                //Số lượng
                cart.getTotalQuantity() + cartItem.getQuantity(),
                totalDiscount,
                totalCurrentPrice,
                //Tổng tiền
                cart.getTotalPrice() + cartItem.getTotalPrice());

        return cartManager.createCartItem(cartItem);
    }

    private void validateCartInput(Cart cart, List<CartItem> cartItems) throws EcomosException {
        if (null == cart) {
            throw new EcomosException("not_found", "Vui lòng nhập thông tin giỏ hàng", "Cart is not available");
        }
        if (null == cart.getUserId()) {
            throw new EcomosException("not_found", "Vui lòng nhập mã khách hàng của giỏ hàng này.", "User id is not available");
        }
        if (null != cartItems && cartItems.size() != 0) {
            for (CartItem cartItem : cartItems) {
                //validate
                validateCartItemInput(cartItem);
            }

        }
    }

    private void validateCartItemInput(CartItem cartItem) throws EcomosException {
        if (null == cartItem.getProductVariant()) {
            throw new EcomosException("not_found", "Vui lòng nhập thông tin của sản phẩm.", "Product variant is not available");
        }
        if (0 == cartItem.getQuantity()) {
            throw new EcomosException("not_found", "Số lượng của sản phầm :" + cartItem.getProductVariant().getProductName() + " nhỏ hơn hoặc bằng không.", "Quantity is not available");
        }
        if (null == cartItem.getProductVariant().getPrice()) {
            throw new EcomosException("not_found", "Sản phẩm chưa có giá", "product variant.price is null");
        }
        double total = cartItem.getQuantity() * cartItem.getProductVariant().getSalePrice().getAmount();
        cartItem.setTotalPrice(total);
    }
}
