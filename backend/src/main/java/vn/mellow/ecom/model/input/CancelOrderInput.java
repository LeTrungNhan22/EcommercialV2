package vn.mellow.ecom.model.input;

import lombok.Data;
import vn.mellow.ecom.enums.OrderCancelReason;

@Data
public class CancelOrderInput {
    private String note;
    private OrderCancelReason cancelReason;
}
