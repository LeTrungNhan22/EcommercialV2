package vn.ecomos.ecom.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.enums.RoleStatus;
import vn.ecomos.ecom.enums.RoleType;

import java.util.Date;

@Data
public class Role extends BaseModel {
    private String userId;
    private String note;
    private String description;
    private RoleType roleType;
    private RoleStatus roleStatus;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date cancelledAt;

}
