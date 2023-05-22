package vn.ecomos.ecom.model.websocket;

import lombok.Data;
import vn.ecomos.ecom.base.filter.BaseFilter;

/**
 * @author : Vũ Văn Minh
 * @mailto : duanemellow19@gmail.com
 * @created : 06/05/2023, Thứ Bảy
 **/
@Data
public class MessageFilter extends BaseFilter {
    private String byFrom;
    private String byTo;

}
