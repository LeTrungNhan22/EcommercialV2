package vn.ecomos.ecom.model.input;

import lombok.Data;
import vn.ecomos.ecom.enums.OrderCancelReason;

@Data
public class CancelOrderInput {
    private String note;
    private OrderCancelReason cancelReason;
}
