package vn.mellow.ecom.model.order;

import lombok.Data;
import vn.mellow.ecom.base.filter.BaseFilter;
import vn.mellow.ecom.enums.OrderStatus;
import vn.mellow.ecom.enums.OrderType;

@Data
public class OrderFilter extends BaseFilter {
    private String orderId;
    private OrderStatus status;
    private OrderType type;
    private String carrierId;
    private String userId;
    private Integer shopId;
    private String shippingServiceId;

}
