package vn.ecomos.ecom.model.input;

import lombok.Data;

@Data
public class CreateUserInput {
    private UserIP user;
    private KeyPasswordInput password;
    private RoleInput role;
}
