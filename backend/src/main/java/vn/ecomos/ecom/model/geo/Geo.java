package vn.ecomos.ecom.model.geo;

import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.enums.GeoType;

@Data
public class Geo extends BaseModel {
    private String name;
    private int ghn_id;
    private int parent_id;
    private String code;
    private GeoType type;
    private String description;
}
