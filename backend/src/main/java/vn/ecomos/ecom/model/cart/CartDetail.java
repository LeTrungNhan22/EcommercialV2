package vn.ecomos.ecom.model.cart;

import lombok.Data;
import vn.ecomos.ecom.base.logs.ActivityLog;

import java.util.List;

@Data
public class CartDetail {
    private Cart cart;
    private List<CartItem> cartItems;
    private List<ActivityLog> activityLogs;

}
