package vn.ecomos.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.ecomos.ecom.base.exception.ServiceException;
import vn.ecomos.ecom.enums.OrderStatus;
import vn.ecomos.ecom.enums.OrderType;
import vn.ecomos.ecom.manager.CartManager;
import vn.ecomos.ecom.manager.OrderManager;
import vn.ecomos.ecom.manager.UserManager;
import vn.ecomos.ecom.utils.MoneyCalculateUtils;
import vn.ecomos.ecom.model.cart.CartItem;
import vn.ecomos.ecom.model.input.CreateOrderInput;
import vn.ecomos.ecom.model.order.Order;
import vn.ecomos.ecom.model.order.OrderItem;
import vn.ecomos.ecom.model.shop.Shop;
import vn.ecomos.ecom.model.user.User;
import vn.ecomos.ecom.model.user.UserProfile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class OrderCreateController {
    @Autowired
    private OrderManager orderManager;
    @Autowired
    private UserProfileController userController;
    @Autowired
    private UserManager userManager;
    @Autowired
    private CartManager cartManager;

    private void validateOrderInputCreate(CreateOrderInput item) throws ServiceException {
        if (null == item) {
            throw new ServiceException("invalid_data", "Thông tin không hợp lệ", "Order Input Create is required");
        }
        if (null == item.getUserId()) {
            throw new ServiceException("invalid_data", "Vui lòng nhập mã user", "userId is required");
        }
        if (null == item.getCartItemInputs()) {
            throw new ServiceException("invalid_data", "Vui lòng truyền danh sách item giỏ hàng ", "cartItems is required");
        }

    }


    // create order
    public List<Order> createOrder(CreateOrderInput orderCreateInput) throws ServiceException {
        //validate data
        validateOrderInputCreate(orderCreateInput);
        List<Order> orders = new ArrayList<>();
        UserProfile userProfile = userController.getUserProfile(orderCreateInput.getUserId());
        User user = userProfile.getUser();
        HashMap<Integer, List<CartItem>> mapShop = new HashMap<>();
        for (CartItem cartItem : orderCreateInput.getCartItemInputs()) {
            List<CartItem> sampleCartItems = mapShop.computeIfAbsent(cartItem.getShopId(), k -> new ArrayList<>());
            sampleCartItems.add(cartItem);
        }
        for (Integer shopId : mapShop.keySet()) {
            Shop shop = userManager.getInfoShop(shopId);
            List<OrderItem> orderItems = new ArrayList<>();
            double totalPrice = 0;
            double totalDiscount = 0;
            for (CartItem cartItem : mapShop.get(shopId)) {
                OrderItem orderItem = new OrderItem();
                orderItem.setVariant(cartItem.getProductVariant());
                orderItem.setShopId(cartItem.getShopId());
                orderItem.setShopName(shop.getName());
                orderItem.setOrderStatus(OrderStatus.READY);

                //Tổng số tiền giảm giá
                orderItem.setDiscountedTotalPrice(MoneyCalculateUtils.getMoney(cartItem.getProductVariant().getPrice().getAmount() -
                        cartItem.getProductVariant().getSalePrice().getAmount()));
                totalPrice += cartItem.getTotalPrice();
                totalDiscount += orderItem.getDiscountedTotalPrice().getAmount();
                orderItem.setQuantity(cartItem.getQuantity());


                orderItem.setOriginalTotalPrice(MoneyCalculateUtils.getMoney(
                        cartItem.getProductVariant().getPrice().getAmount()
                ));   //Tổng số tiền chưa giảm giá(giá gốc)
                orderItems.add(orderItem);

                cartManager.deleteCartItem(cartItem.getId());   //remove cart item

            }
            Order order = new Order();
            order.setUserId(user.getId());
            order.setType(OrderType.PURCHASE);
            order.setShopId(shopId);
            order.setShopName(shop.getName());
            order.setStatus(OrderStatus.READY);
            order.setTotalPrice(MoneyCalculateUtils.getMoney(totalPrice));
            order.setDiscountTotalPrice(MoneyCalculateUtils.getMoney(totalDiscount));
            order.setShippingAddress(user.getAddress());
            order.setPhoneCustomer(user.getTelephone());
            order.setEmailCustomer(user.getEmail());
            order.setNameCustomer(user.getFullName() != null ? user.getFullName() : user.getUsername());
            order.setPayment(orderCreateInput.isPayment());
            //create đơn mua
            order = orderManager.createOrder(order, orderItems);
            orders.add(order);
            //create đơn bán
            order.setType(OrderType.SELL);
            order.setFromOrderId(order.getId());
            order = orderManager.createOrder(order, orderItems);
            orders.add(order);
        }
        return orders;
    }
}
