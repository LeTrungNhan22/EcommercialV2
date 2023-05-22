package vn.mellow.ecom.model.input;

import lombok.Data;

@Data
public class CreateUserInput {
    private UserInput user;
    private KeyPasswordInput password;
    private RoleInput role;
}
