package vn.ecomos.ecom.model.input;

import lombok.Data;
import vn.ecomos.ecom.enums.ActiveStatus;

/**
 * @author : Vũ Văn Minh
 * @mailto : duanemellow19@gmail.com
 * @created : 03/04/2023, Thứ Hai
 **/
@Data
public class ShopUpdateInput {
    private String name;
    private String imageUrl;
    private String description;
    private ActiveStatus status;
}
