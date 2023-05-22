package vn.mellow.ecom.model.input;

import lombok.Data;
import vn.mellow.ecom.enums.RoleStatus;
import vn.mellow.ecom.enums.RoleType;

@Data
public class RoleInput {
    private String note;
    private String description;
    private RoleType roleType;
    private RoleStatus roleStatus;
}
