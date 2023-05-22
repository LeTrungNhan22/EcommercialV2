package vn.ecomos.ecom.model.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.lang.NonNull;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.base.model.MoneyV2;
import vn.ecomos.ecom.enums.OrderStatus;
import vn.ecomos.ecom.model.product.ProductVariant;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class OrderItem extends BaseModel {
    private int shopId;
    private String shopName;
    private MoneyV2 discountedTotalPrice;
    private MoneyV2 originalTotalPrice;
    private Long quantity;
    private ProductVariant variant;
    @NonNull
    private String orderId;
    @NonNull
    private String orderItemId;
    private String note;
    @JsonFormat(
            shape = JsonFormat.Shape.NUMBER
    )
    private Date completedAt;
    private String orderItemName;
    private OrderStatus orderStatus;

    public OrderItem() {

    }
}
