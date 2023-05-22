package vn.mellow.ecom.base.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import vn.mellow.ecom.enums.BasicStatus;


@Data
@AllArgsConstructor
public class ResponseResult {
    private int status;
    private String message;
    private Object data;

}
