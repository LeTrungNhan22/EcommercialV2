package vn.mellow.ecom.model.input;

import lombok.Data;
import vn.mellow.ecom.enums.PasswordStatus;

@Data
public class KeyPasswordInput {
    private String password;
    private String note;
    private PasswordStatus passwordStatus;
}
