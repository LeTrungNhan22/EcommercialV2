package vn.mellow.ecom.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.TextIndexed;
import vn.mellow.ecom.base.logs.ActivityUser;
import vn.mellow.ecom.base.model.BaseModel;
import vn.mellow.ecom.enums.GenderType;
import vn.mellow.ecom.enums.RoleType;
import vn.mellow.ecom.enums.ServiceType;
import vn.mellow.ecom.enums.UserStatus;
import vn.mellow.ecom.model.geo.Address;
import vn.mellow.ecom.model.shop.Shop;

import java.util.Date;

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
    @NonNull
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
