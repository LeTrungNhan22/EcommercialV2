package vn.ecomos.ecom.model.input;

import lombok.Data;
import vn.ecomos.ecom.enums.RoleStatus;
import vn.ecomos.ecom.enums.RoleType;

@Data
public class RoleInput {
    private String note;
    private String description;
    private RoleType roleType;
    private RoleStatus roleStatus;
}
