package vn.ecomos.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.ecomos.ecom.base.controller.MainController;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.enums.OrderStatus;
import vn.ecomos.ecom.manager.OrderManager;
import vn.ecomos.ecom.base.logs.ActivityUser;
import vn.ecomos.ecom.model.input.CancelOrderIP;
import vn.ecomos.ecom.model.input.UpdateStatusInput;
import vn.ecomos.ecom.model.order.Order;
import vn.ecomos.ecom.model.order.OrderDetail;

@Component
public class OrderDetailController extends MainController {
    @Autowired
    private OrderManager orderManager;

    // get order detail
    public Order getOrder(String orderId) throws EcomosException {
        Order data = orderManager.getOrder(orderId);
        if (null == data) {
            throw new EcomosException("not_found", "Không tìm thấy thông tin đơn hàng", "Not found order by order id: " + orderId);
        }
        return data;
    }

    // get order detail
    public OrderDetail getOrderDetail(String orderId) throws EcomosException {
        OrderDetail data = orderManager.getOrderDetail(orderId);
        if (null == data) {
            throw new EcomosException("not_found", "Không tìm thấy thông tin chi tiết đơn hàng", "Not found order by order id: " + orderId);
        }
        return data;
    }

    public Order cancelOrder(String orderId, CancelOrderIP cancelInput) throws
            EcomosException {
        //check order exists
        Order order = getOrder(orderId);
        if (null == order) {
            throw new EcomosException("cancel_failure", "Xác nhận hủy đơn hàng " + orderId +
                    " không thành công. Đơn hàng không tồn tại.", "cancelled order failure");

        }
        orderManager.cancelOrder(orderId, cancelInput.getCancelReason(), cancelInput.getNote());
        orderManager.cancelOrder(order.getFromOrderId(), cancelInput.getCancelReason(), cancelInput.getNote());
        order = getOrder(orderId);

        return order;
    }

    public Order confirmSequenceStatus(String orderId, ActivityUser byUser) throws EcomosException {
        Order order = getOrder(orderId);
        if (OrderStatus.DELIVERED.equals(order.getStatus())
                || OrderStatus.CANCELLED.equals(order.getStatus())) {
            return order;
        }
        String status = OrderStatus.DELIVERY_ONLY.toString();
        if (OrderStatus.DELIVERY_ONLY.equals(order.getStatus())) {
            status = OrderStatus.DELIVERED.toString();
        }
        UpdateStatusInput statusInput = new UpdateStatusInput();
        statusInput.setStatus(status);
        statusInput.setNote("Shop " + order.getShopId() + " cập nhật trạng thái " + status + " cho đơn hàng " + orderId);
        statusInput.setByUser(byUser);
        orderManager.updateOrderStatus(order.getFromOrderId(), statusInput);
        return orderManager.updateOrderStatus(orderId, statusInput);
    }
}
