package vn.ecomos.ecom.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Transient;
import vn.ecomos.ecom.base.logs.ActivityUser;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.enums.GenderType;
import vn.ecomos.ecom.enums.RoleType;
import vn.ecomos.ecom.enums.ServiceType;
import vn.ecomos.ecom.enums.UserStatus;
import vn.ecomos.ecom.model.geo.Address;
import vn.ecomos.ecom.model.shop.Shop;


import java.util.Date;
import javax.validation.constraints.NotNull;


@Data
public class User extends BaseModel {

    private String username;
    private String fullName;
    private String email;
    private String telephone;
    private String imageUrl;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date birthday;
    private Address address;
    private GenderType gender;
    @NotNull
    private ServiceType serviceType;
    private String description;
    private UserStatus userStatus;
    private ActivityUser byUser;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date cancelledAt;
    private Shop shop;
    @Transient
    private RoleType roleType;



    public User() {
    }
}
