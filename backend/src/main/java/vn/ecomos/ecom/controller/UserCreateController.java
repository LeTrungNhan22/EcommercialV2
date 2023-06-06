package vn.ecomos.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.enums.*;
import vn.ecomos.ecom.manager.ScoreManager;
import vn.ecomos.ecom.manager.UserManager;
import vn.ecomos.ecom.model.user.*;
import vn.ecomos.ecom.utils.KeyUtils;
import vn.ecomos.ecom.utils.RemoveAccentUtils;

import vn.ecomos.ecom.model.input.CreateUserInput;
import vn.ecomos.ecom.model.input.KeyPasswordInput;
import vn.ecomos.ecom.model.input.RoleInput;
import vn.ecomos.ecom.model.input.UserIP;


import java.util.List;

@Component
public class UserCreateController {
    @Autowired
    private UserManager userManager;
    @Autowired
    private ScoreManager scoreManager;

    public User createUser(CreateUserInput createUserInput) throws EcomosException {
//        check input data
        validateCreateUserInput(createUserInput);
        UserIP userIP = createUserInput.getUser();
        User user = new User();
        user.setByUser(userIP.getByUser());
        user.setUsername(userIP.getUsername());
        if (null == userIP.getUsername()) {
            user.setUsername(RemoveAccentUtils.generateUserName(userIP.getFullName()));
        }
        user.setTelephone(userIP.getTelephone());

        UserStatus userStatus = UserStatus.INACTIVE;
        if (null != userIP.getUserStatus()) {
            userStatus = userIP.getUserStatus();

        }

        user.setUserStatus(userStatus);
        user.setGender(userIP.getGender());
        user.setEmail(userIP.getEmail());
        user.setFullName(userIP.getFullName());
        user.setBirthday(userIP.getBirthday());
        user.setAddress(userIP.getAddress());
        user.setImageUrl(userIP.getImageUrl());

        if (null == userIP.getImageUrl()) {
            String imageUrl = userIP.getFullName() == null ?
                    user.getUsername() :
                    userIP.getFullName();
            user.setImageUrl("https://ui-avatars.com/api/?name="
                    + imageUrl.replaceAll(" ", ""));
        }
        ServiceType serviceType = ServiceType.NORMALLY;
        if (null != userIP.getServiceType()) {
            serviceType = userIP.getServiceType();
        }

        user.setServiceType(serviceType);
        user.setDescription("Login " + user.getServiceType().getDescription());
        //set key password
        KeyPasswordInput keyPasswordInput = createUserInput.getPassword();
        KeyPassword keyPassword = new KeyPassword();

        String token = KeyUtils.getToken();
        String password = KeyUtils.SHA256(KeyUtils.decodeBase64Encoder(keyPasswordInput.getPassword()) + token);

        keyPassword.setPassword(password);
        keyPassword.setToken(token);
        keyPassword.setNote(keyPasswordInput.getNote());

        PasswordStatus passwordStatus = PasswordStatus.NEW;
        if (null != keyPasswordInput.getPasswordStatus()) {
            passwordStatus = keyPasswordInput.getPasswordStatus();

        }
        keyPassword.setPasswordStatus(passwordStatus);

        //role
        RoleInput roleInput = createUserInput.getRole();
        Role role = new Role();
        role.setNote(roleInput.getNote());
        role.setDescription(roleInput.getDescription());
        role.setRoleType(roleInput.getRoleType());
        RoleStatus roleStatus = RoleStatus.ACTIVE;
        if (null != roleInput.getRoleStatus()) {
            roleStatus = roleInput.getRoleStatus();
        }
        role.setRoleStatus(roleStatus);
        UserFilter userFilter = new UserFilter();
        if (null != createUserInput.getUser().getEmail()) {
            userFilter.setEmail(createUserInput.getUser().getEmail());
            userFilter.setServiceType(createUserInput.getUser().getServiceType());
        }
        List<User> userList = userManager.filterUser(userFilter).getResultList();

        if (userList.size() != 0) {
            if (UserStatus.ACTIVE.equals(userList.get(0).getUserStatus())) {
                throw new EcomosException("exist_account", "Email của bạn đã tồn tại", "Email user is exists");
            }
            if (UserStatus.INACTIVE.equals(userList.get(0).getUserStatus())) {
                userManager.updatePassword(userList.get(0).getId(), password);
                return userManager.getUser(userList.get(0).getId());

            }
        }

        user = userManager.createUser(user, keyPassword, role);
        // create score
        Score score = new Score();
        score.setUserId(user.getId());
        score.setType(ScoreType.RANK_BRONZE);
        score.setScore(0);
        scoreManager.createScore(score);
        return user;
    }

    private void validateCreateUserInput(CreateUserInput createUserInput) throws EcomosException {
        if (null == createUserInput) {
            throw new EcomosException("invalid_data", "Chưa điền thông tin cho user", "user is null");
        }
        if (null == createUserInput.getUser()) {
            throw new EcomosException("invalid_data", "Chưa điền thông tin cho user", "user is null");
        }
        if (null == createUserInput.getUser().getEmail()) {
            throw new EcomosException("invalid_data", "Chưa điền thông tin cho email", "email is null");
        }

        if (null != createUserInput.getUser().getUserStatus() &&
                !UserStatus.isExist(createUserInput.getUser().getUserStatus().toString())) {
            throw new EcomosException(
                    "exists_status", "Trạng thái của user không tồn tại.( " +
                    UserStatus.getListName() + " )", "Status user is not exists");
        }
        if (null != createUserInput.getUser().getGender() &&
                !GenderType.isExist(createUserInput.getUser().getGender().toString())) {
            throw new EcomosException("exists_type", "Loại giới tính không tồn tại.( " +
                    GenderType.getListName() + " )", "gender type is not exists");
        }
        if (!ServiceType.isExist(createUserInput.getUser().getServiceType().toString())) {
            throw new EcomosException("exists_type", "Loại dịch vụ không tồn tại. ( " +
                    ServiceType.getListName() + " )", "service type is not exists");
        }


        if (null == createUserInput.getPassword() || null == createUserInput.getPassword().getPassword()
                || createUserInput.getPassword().getPassword().length() == 0
                || "null".equalsIgnoreCase(createUserInput.getPassword().getPassword())) {
            throw new EcomosException("invalid_data", "Chưa điền thông tin cho password", "password is null");
        }
        if (null == createUserInput.getPassword().getPasswordStatus() &&
                !PasswordStatus.isExist(createUserInput.getPassword().getPasswordStatus().toString())) {
            throw new EcomosException("exists_status", "Trạng thái của password không tồn tại.( " +
                    PasswordStatus.getListName() + " )", "Status password is not exists");

        }
        if (null == createUserInput.getRole() || null == createUserInput.getRole().getRoleType()) {
            throw new EcomosException("invalid_data", "Chưa tạo phân quyền cho user", "role is null");
        }
        if (null != createUserInput.getRole().getRoleStatus()
                && !RoleStatus.isExist(createUserInput.getRole().getRoleStatus())) {
            throw new EcomosException("exists_status", "Trạng thái của role không tồn tại.( " +
                    RoleStatus.getListName() + " )", "Status role is not exists");

        }
        if (!RoleType.isExist(createUserInput.getRole().getRoleType().toString())) {
            throw new EcomosException("exists_type", "Loại phân quyền không tồn tại. ( " +
                    RoleType.getListName() + " )", "Role type is not exists");

        }
    }

}
