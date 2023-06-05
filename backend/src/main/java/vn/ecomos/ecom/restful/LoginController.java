package vn.ecomos.ecom.restful;

import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.ecomos.ecom.base.controller.MainController;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.controller.CreateCartController;
import vn.ecomos.ecom.controller.UserCreateController;
import vn.ecomos.ecom.enums.*;
import vn.ecomos.ecom.manager.UserManager;
import vn.ecomos.ecom.utils.JwtUtils;
import vn.ecomos.ecom.utils.KeyUtils;
import vn.ecomos.ecom.base.model.ResponseResult;

import vn.ecomos.ecom.model.cart.Cart;
import vn.ecomos.ecom.model.input.CreateUserInput;
import vn.ecomos.ecom.model.input.KeyPasswordInput;
import vn.ecomos.ecom.model.input.RoleInput;
import vn.ecomos.ecom.model.input.UserIP;
import vn.ecomos.ecom.model.user.Role;
import vn.ecomos.ecom.model.user.User;
import vn.ecomos.ecom.model.user.UserFilter;

import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user/1.0.0/login")
public class LoginController extends MainController {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserManager userManager;
    @Autowired
    private UserCreateController userCreateController;

    @Autowired
    private CreateCartController createCartController;

    private void validateLoginInput(String email, String password, boolean admin, ServiceType serviceType, String fullName) throws EcomosException {
        if (null == email) {
            throw new EcomosException("invalid_data", "Chưa nhập thông tin Email", "Email is null");
        }
        if (ServiceType.NORMALLY.equals(serviceType))
            if (null == password) {
                throw new EcomosException("invalid_data", "Chưa nhập mật khẩu", "Password is null");
            }
        if (!admin)
            if (null == serviceType ||
                    !ServiceType.isExist(serviceType.toString())) {
                throw new EcomosException("exists_type", "Loại dịch vụ không tồn tại. ( " + ServiceType.getListName() + " )", "service type is not exists");
            }
    }

    @ApiOperation(value = "Login account admin")
    @PostMapping("/admin")
    public ResponseResult loginAdmin(
            @RequestParam("email") String email, @RequestParam("password") String password) {
        // validateLoginInput
        try {
            validateLoginInput(email, password, true, null, null);
            UserFilter userFilter = new UserFilter();
            userFilter.setEmail(email);
            User user = userManager.getUserByMail(email);
            if (null == user) {
                return new ResponseResult(0,
                        "Đăng nhập thất bại. Không tìm thấy thông tin tài khoản", "Account is not admin");
            }
            RoleType roleType = null;
            List<Role> roleList = userManager.getAllRole(user.getId());
            for (Role role : roleList) {
                if (RoleStatus.ACTIVE.equals(role.getRoleStatus()))
                    if (role.getRoleType().equals(RoleType.ADMIN)) {
                        roleType = role.getRoleType();
                        break;
                    }

            }
            if (null == roleType) {
                return new ResponseResult(0,
                        "Đăng nhập thất bại. Không tìm thấy thông tin tài khoản", "Account is not admin");
            }
            String decodePassword = KeyUtils.decodeBase64Encoder(password) + KeyUtils.getToken();
            Authentication auth = null;
            try {
                auth = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(email, KeyUtils.SHA256(decodePassword)));
            } catch (Exception e) {
                return new ResponseResult(0, e.getMessage(), e.getLocalizedMessage());

            }
            if (auth != null && auth.isAuthenticated()) {
                return new ResponseResult(1,
                        "Đăng nhập thành công",
                        jwtUtils.generateToken(email));

            } else {
                return new ResponseResult(0,
                        "Đăng nhập thất bại. Không tìm thấy thông tin tài khoản", "Account is not admin");

            }
        } catch (EcomosException e) {
            return new ResponseResult(0, e.getErrorMessage(), e.getErrorDetail());
        }
    }

    @ApiOperation(value = "Login account normal")
    @PostMapping("/customer")
    public ResponseResult loginCustomer(@RequestParam("email") String email, @RequestParam("password") String password, @RequestParam("service-type") ServiceType serviceType,
                                        @RequestParam("full-name") String fullName,
                                        @RequestParam("image") String imageUrl) {
        // validateLoginInput
        try {
            validateLoginInput(email, password, false, serviceType, fullName);
            UserFilter userFilter = new UserFilter();
            userFilter.setEmail(email);
            List<User> users = userManager.filterUser(userFilter).getResultList();// search user by email
            User currentUser = null;
            for (User user : users) {
                if (user.getServiceType().equals(serviceType)) {
                    currentUser = user;
                    break;
                }
            }
            if (ServiceType.NORMALLY.equals(serviceType)) {
                if (null == currentUser) {
                    return new ResponseResult(0,
                            "Đăng nhập thất bại. Không tìm thấy thông tin tài khoản",
                            "Account is not personal");
                }
                if (!UserStatus.ACTIVE.equals(currentUser.getUserStatus())) {
                    return new ResponseResult(0,
                            "Đăng nhập thất bại. Không tìm thấy thông tin tài khoản",
                            "Account is not active");

                }
                RoleType roleType = null;
                List<Role> roleList = userManager.getAllRole(currentUser.getId());
                for (Role role : roleList) {
                    if (RoleStatus.ACTIVE.equals(role.getRoleStatus()))
                        if (role.getRoleType().equals(RoleType.PERSONAL) || role.getRoleType().equals(RoleType.STORE) ||
                                role.getRoleType().equals(RoleType.PERSONAL_STORE)) {
                            roleType = role.getRoleType();
                            break;
                        }

                }
                if (null == roleType) {
                    return new ResponseResult(0,
                            "Đăng nhập thất bại. Không tìm thấy thông tin tài khoản",
                            "Account is not personal");
                }
                String decodePassword = KeyUtils.decodeBase64Encoder(password) + KeyUtils.getToken();

                Authentication auth = null;
                try {
                    auth = authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(email, KeyUtils.SHA256(decodePassword)));
                } catch (Exception e) {
                    return new ResponseResult(0, e.getMessage(), e.getLocalizedMessage());

                }
                if (auth != null && auth.isAuthenticated()) {
                    return new ResponseResult(1,
                            "Đăng nhập thành công", jwtUtils.generateToken(email));
                }
            } else {
                if (currentUser == null) {
                    CreateUserInput createUserInput = new CreateUserInput();
                    UserIP userIP = new UserIP();
                    userIP.setImageUrl(imageUrl);
                    userIP.setEmail(email);
                    userIP.setServiceType(serviceType);
                    userIP.setFullName(fullName);

                    KeyPasswordInput keyPasswordInput = new KeyPasswordInput();
                    keyPasswordInput.setPassword(String.valueOf(System.currentTimeMillis()));
                    keyPasswordInput.setPasswordStatus(PasswordStatus.NEW);

                    RoleInput role = new RoleInput();
                    role.setRoleType(RoleType.PERSONAL);

                    createUserInput.setUser(userIP);
                    createUserInput.setPassword(keyPasswordInput);
                    createUserInput.setRole(role);
                    User result = userCreateController.createUser(createUserInput);

                    Cart cart = new Cart();// create cart
                    cart.setUserId(result.getId());
                    createCartController.createCart(cart, null);
                    return new ResponseResult(1,
                            "Đăng nhập thành công", result);
                } else {
                    return new ResponseResult(1,
                            "Đăng nhập thành công", currentUser);

                }

            }
        } catch (EcomosException e) {
            return new ResponseResult(0, e.getErrorMessage(), e.getErrorDetail());
        }
        return new ResponseResult(0,
                "Đăng nhập thất bại. Không tìm thấy thông tin tài khoản", "Account is not personal");


    }

    @ApiOperation(value = "get info account login by token")
    @GetMapping("/info")
    public User getUser(@RequestParam("code-token") String token, @RequestParam("service-type") ServiceType serviceType) throws EcomosException {
        if (null == serviceType ||
                !ServiceType.isExist(serviceType.toString())) {
            throw new EcomosException("exists_type", "Loại dịch vụ không tồn tại. ( " + ServiceType.getListName() + " )", "service type is not exists");
        }
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));
        String sub = payload.split("\\,")[0];
        String email = sub.substring(8, sub.length() - 1);
        UserFilter filter = new UserFilter();
        filter.setEmail(email);
        filter.setServiceType(serviceType);
        List<User> users = userManager.filterUser(filter).getResultList();
        if (users.isEmpty()) {
            throw new EcomosException("exists_account", "Không tìm thấy tài khoản", "user is not exists");
        }
        return users.get(0);
    }

    private final static Logger LOGGER = LoggerFactory.getLogger(LoginController.class);

    @ExceptionHandler(EcomosException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Object handleAllServiceException(EcomosException e) {
        LOGGER.error("ServiceException error.", e);
        return error(e.getErrorCode(), e.getErrorMessage(), e.getErrorDetail());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Object handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return error("internal_server_error", "Có lỗi trong quá trình xử lý", e.getMessage());
    }
}
