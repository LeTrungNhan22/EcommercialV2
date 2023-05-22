package vn.ecomos.ecom.model.industrial;

import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;

//ngành hàng
@Data
public class IndustrialProduct extends BaseModel {
    private String name;
    private String iconUrl;
    private String description;
}
