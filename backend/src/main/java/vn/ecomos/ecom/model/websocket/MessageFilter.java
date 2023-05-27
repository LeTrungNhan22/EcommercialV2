package vn.ecomos.ecom.model.websocket;

import lombok.Data;
import vn.ecomos.ecom.base.filter.BaseFilter;

@Data
public class MessageFilter extends BaseFilter {
    private String byFrom;
    private String byTo;

}
