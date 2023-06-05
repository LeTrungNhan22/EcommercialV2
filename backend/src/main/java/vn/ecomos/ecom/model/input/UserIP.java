package vn.ecomos.ecom.model.input;

import lombok.Data;
import lombok.NonNull;
import vn.ecomos.ecom.base.logs.ActivityUser;
import vn.ecomos.ecom.enums.GenderType;
import vn.ecomos.ecom.enums.ServiceType;
import vn.ecomos.ecom.enums.UserStatus;
import vn.ecomos.ecom.model.geo.Address;

import java.util.Date;

@Data
public class UserIP {
    private String username;
    private String fullName;
    private String email;
    private String telephone;
    private Date birthday;
    private Address address;
    private GenderType gender;
    private String imageUrl;
    @NonNull
    private ServiceType serviceType;
    private String description;
    private UserStatus userStatus;
    private ActivityUser byUser;

    public UserIP() {

    }
}
