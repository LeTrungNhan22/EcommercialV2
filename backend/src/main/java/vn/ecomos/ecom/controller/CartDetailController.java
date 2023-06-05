package vn.ecomos.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.manager.CartManager;
import vn.ecomos.ecom.manager.ProductManager;
import vn.ecomos.ecom.manager.UserManager;
import vn.ecomos.ecom.model.cart.Cart;
import vn.ecomos.ecom.model.cart.CartDetail;
import vn.ecomos.ecom.model.cart.CartItem;
import vn.ecomos.ecom.model.product.Product;
import vn.ecomos.ecom.model.product.ProductVariant;

import java.util.List;

@Component
public class CartDetailController {
    @Autowired
    private CartManager cartManager;

    @Autowired
    private ProductManager productManager;

    @Autowired
    private UserManager userManager;


    public CartDetail getCartDetail(String userId) throws EcomosException {
        CartDetail cartDetail = new CartDetail();
        Cart cart = cartManager.getCart(userId);
        if (cart == null) {
            throw new EcomosException("not_found", "Không tìm thấy thông tin giỏ hàng :" + userId, "Cart not found");
        }
        List<CartItem> cartItems = cartManager.getCartItems(cart.getId());
        if (null != cartItems || cartItems.size() != 0) {
            for (CartItem cartItem : cartItems) {
                ProductVariant variant = cartItem.getProductVariant();
                Product product = productManager.getProduct(variant.getProductId());
                Integer shopId = product.getShopId();
                if (null == shopId) {
                    continue;
                }
                cartItem.setShopId(shopId);

            }
        }
        cartDetail.setCartItems(cartItems);
//        List<ActivityLog> activityLogs = cartManager.getActivityLogs(cart.getId());
//        cartDetail.setActivityLogs(activityLogs);
        cartDetail.setCart(cart);
        return cartDetail;

    }

    public CartDetail deleteCartItem(String cartItemId, long quantity) throws EcomosException {
        CartItem cartItem = cartManager.getCartItem(cartItemId);
        if (null == cartItem) {
            throw new EcomosException("not_found", "Không tìm thấy thông tin cart item :" + cartItemId, "Not found cart item :" + cartItemId);
        }
        Cart cart = cartManager.getCartById(cartItem.getCartId());
        if (quantity == 0) {
            cartManager.deleteCartItem(cartItemId);
            quantity = cartItem.getQuantity();
        } else {
            cartManager.updateQuantityCartItem(cartItem.getId(), cartItem.getQuantity() - quantity
                    , cartItem.getTotalPrice() - (quantity *
                            cartItem.getProductVariant().getSalePrice().getAmount()));
        }
        //tổng tiền giảm
        double totalDiscount = cart.getTotalDiscount() - (quantity * (
                cartItem.getProductVariant().getPrice().getAmount() -
                        cartItem.getProductVariant().getSalePrice().getAmount()));
        //tổng tiền ban đầu chưa giảm
        double totalCurrentPrice = cart.getTotalCurrentPrice() - (quantity *
                cartItem.getProductVariant().getPrice().getAmount());
        cartManager.updateCartQuantity(cartItem.getCartId(),
                cart.getTotalQuantity() - quantity,
                totalDiscount,
                totalCurrentPrice,
                cart.getTotalPrice() - (quantity *
                        cartItem.getProductVariant().getSalePrice().getAmount()));


        return getCartDetail(cart.getUserId());

    }

    public CartDetail updateQuantityCartItem(String cartItemId, long quantity) throws EcomosException {
        CartItem cartItem = cartManager.getCartItem(cartItemId);
        if (null == cartItem) {
            throw new EcomosException("not_found", "Không tìm thấy thông tin cart item :" + cartItemId, "Not found cart item :" + cartItemId);
        }
        Cart cart = cartManager.getCartById(cartItem.getCartId());

        if (quantity == 0) {
            return deleteCartItem(cartItemId, quantity);
        }


        long oldQuantity = cartItem.getQuantity();
        long quantityDiff = quantity - oldQuantity; // Tính toán sự thay đổi của quantity

        if (quantityDiff == 0) {
            return getCartDetail(cart.getUserId()); // Không có sự thay đổi, trả về ngay
        }

        // Cập nhật giá trị mới của cartItem
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(quantity * cartItem.getProductVariant().getSalePrice().getAmount());
        cartManager.updateQuantityCartItem(cartItem.getId(), quantity, cartItem.getTotalPrice());

        // Cập nhật lại các giá trị của cart
        double totalDiscount = cart.getTotalDiscount() + (quantityDiff *
                (cartItem.getProductVariant().getPrice().getAmount() - cartItem.getProductVariant().getSalePrice().getAmount()));
        double totalCurrentPrice = cart.getTotalCurrentPrice() + (quantityDiff * cartItem.getProductVariant().getPrice().getAmount());
        cartManager.updateCartQuantity(cartItem.getCartId(),
                cart.getTotalQuantity() + quantityDiff,
                totalDiscount,
                totalCurrentPrice,
                cart.getTotalPrice() + (quantityDiff * cartItem.getProductVariant().getSalePrice().getAmount()));

        return getCartDetail(cart.getUserId());
    }


}
