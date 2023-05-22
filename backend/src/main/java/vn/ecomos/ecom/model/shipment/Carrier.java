package vn.ecomos.ecom.model.shipment;

import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.enums.ActiveStatus;
import vn.ecomos.ecom.enums.CarrierType;

@Data
public class Carrier extends BaseModel {
    private String name;
    private ActiveStatus status;
    private String description;
    private CarrierType type;
    private String gatewayCode;
}
