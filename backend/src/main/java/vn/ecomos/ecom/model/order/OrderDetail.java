package vn.ecomos.ecom.model.order;

import lombok.Data;
import vn.ecomos.ecom.base.logs.ActivityLog;

import java.util.List;

@Data
public class OrderDetail {
    private Order order;
    private List<OrderItem> orderItems;
    private List<ActivityLog> activityLogs;
}
