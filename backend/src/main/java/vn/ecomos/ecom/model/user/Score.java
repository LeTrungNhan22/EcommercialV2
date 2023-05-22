package vn.ecomos.ecom.model.user;

import lombok.Data;
import vn.ecomos.ecom.base.model.BaseModel;
import vn.ecomos.ecom.enums.ScoreType;

@Data
public class Score extends BaseModel {
    private String userId;
    private ScoreType type;
    private long score;
}
