package vn.ecomos.ecom.model.input;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import vn.ecomos.ecom.enums.GenderType;

import java.util.Date;

@Data
public class UpdateInfoUserIP {
    private String fullName;
    private String telephone;
    private String email;
    private String username;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date birthday;
    private String imageUrl;
    private GenderType gender;



}
