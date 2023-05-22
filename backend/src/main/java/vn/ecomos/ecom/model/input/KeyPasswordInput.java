package vn.ecomos.ecom.model.input;

import lombok.Data;
import vn.ecomos.ecom.enums.PasswordStatus;

@Data
public class KeyPasswordInput {
    private String password;
    private String note;
    private PasswordStatus passwordStatus;
}
