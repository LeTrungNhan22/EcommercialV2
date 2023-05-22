package vn.mellow.ecom.model.input;

import lombok.Data;
import vn.mellow.ecom.base.logs.ActivityUser;

@Data
public class UpdateStatusInput {
    private String note;
    private String status;
    private ActivityUser byUser;
}
