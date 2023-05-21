package vn.mellow.ecom.ecommercefloor.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NonNull;
import vn.mellow.ecom.ecommercefloor.base.logs.ActivityUser;
import vn.mellow.ecom.ecommercefloor.model.geo.Address;
import vn.mellow.ecom.ecommercefloor.base.model.BaseModel;
import vn.mellow.ecom.ecommercefloor.enums.GenderType;
import vn.mellow.ecom.ecommercefloor.enums.ServiceType;
import vn.mellow.ecom.ecommercefloor.enums.UserStatus;
import vn.mellow.ecom.ecommercefloor.model.shop.Shop;

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


    public User() {
    }
}