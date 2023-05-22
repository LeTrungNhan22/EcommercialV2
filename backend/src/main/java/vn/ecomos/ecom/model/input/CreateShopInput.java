package vn.ecomos.ecom.model.input;

import lombok.Data;
import vn.ecomos.ecom.enums.ActiveStatus;
import vn.ecomos.ecom.model.geo.Address;

@Data
public class CreateShopInput {
    private String name;
    private String imageUrl;
    private String description;
    private String wardCode;
    private int district_id;
    private String phone;
    private String address;
    private Address addressShop;
    private ActiveStatus status;

}
