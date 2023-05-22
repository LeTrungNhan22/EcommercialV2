package vn.ecomos.ecom.model.user;

import lombok.Data;
import vn.ecomos.ecom.base.filter.BaseFilter;
import vn.ecomos.ecom.enums.GenderType;
import vn.ecomos.ecom.enums.RoleType;
import vn.ecomos.ecom.enums.ServiceType;
import vn.ecomos.ecom.enums.UserStatus;


@Data
public class UserFilter extends BaseFilter {
    private String userId;
    private String fullName;
    private String email;
    private String telephone;
    private RoleType roleType;
    private GenderType gender;
    private ServiceType serviceType;
    private UserStatus userStatus;


}
