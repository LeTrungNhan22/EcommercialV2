package vn.ecomos.ecom.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.enums.PasswordStatus;

import java.util.Date;

@Data
public class KeyPassword extends BaseModel {
    private String userId;
    private String password;
    private String note;
    private String token;
    private PasswordStatus passwordStatus;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date cancelledAt;

}
