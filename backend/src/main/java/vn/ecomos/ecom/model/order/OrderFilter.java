package vn.ecomos.ecom.model.order;

import lombok.Data;
import vn.ecomos.ecom.base.filter.BaseFilter;
import vn.ecomos.ecom.enums.OrderStatus;
import vn.ecomos.ecom.enums.OrderType;

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
