package vn.ecomos.ecom.model.input;

import lombok.Data;
import vn.ecomos.ecom.base.logs.ActivityUser;

@Data
public class UpdateStatusInput {
    private String note;
    private String status;
    private ActivityUser byUser;
}
