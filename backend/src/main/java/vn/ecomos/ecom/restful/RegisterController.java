package vn.ecomos.ecom.restful;

import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.ecomos.ecom.base.controller.BaseController;
import vn.ecomos.ecom.base.exception.ServiceException;
import vn.ecomos.ecom.controller.CreateCartController;
import vn.ecomos.ecom.controller.UserCreateController;
import vn.ecomos.ecom.manager.UserManager;
import vn.ecomos.ecom.utils.GeneralIdUtils;
import vn.ecomos.ecom.utils.SendMailUtils;
import vn.ecomos.ecom.base.model.ResponseResult;
import vn.ecomos.ecom.model.cart.Cart;
import vn.ecomos.ecom.model.input.CreateUserInput;
import vn.ecomos.ecom.model.user.DataRegister;
import vn.ecomos.ecom.model.user.User;

import javax.mail.MessagingException;
import javax.mail.Session;
import java.io.UnsupportedEncodingException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user/1.0.0/register")
public class RegisterController extends BaseController {
    private final static Logger LOGGER = LoggerFactory.getLogger(RegisterController.class);

    @Autowired
    private UserManager userManager;
    @Autowired
    private UserCreateController userCreateController;

    @Value("${ecommerce_floor.store.name}")
    private String storeName;
    @Value("${ecommerce_floor.store.mail}")
    private String emailEcommerce;
    @Value("${mellow.password}")
    private String passwordEcommerce;
    @Autowired
    private CreateCartController createCartController;

    @ApiOperation(value = "register account")
    @PostMapping("/user")
    public ResponseResult registerUser(@RequestBody CreateUserInput createInput) {
        User result;

        try {
            result = userCreateController.createUser(createInput);
        } catch (ServiceException e) {
            return new ResponseResult(0, e.getErrorMessage(), e.getErrorDetail());
        }
        if (null != result) {
            String code = GeneralIdUtils.generateId();
            String subject = "Ma xac Thuc";
            String messSendMail = code + " la ma xac thuc OTP dang ky tai khoan tren san thuong mai. " +
                    "De tranh bi mat tien, tuyet doi KHONG chia se ma nay voi bat ky ai.";
            Session session = SendMailUtils.loginMail(emailEcommerce, passwordEcommerce);
            try {
                SendMailUtils.sendMailTo(session, emailEcommerce, storeName, result.getEmail(), subject, messSendMail);

            } catch (UnsupportedEncodingException | MessagingException e) {
                return new ResponseResult(0, "Email không hợp lệ", e.getStackTrace());
            }
            //Send mail to store
            Cart cart = new Cart();
            cart.setUserId(result.getId());
            try {
                createCartController.createCart(cart, null);
            } catch (ServiceException e) {
                return new ResponseResult(0, e.getErrorMessage(), e.getErrorDetail());
            }
            DataRegister dataRegister = new DataRegister();
            dataRegister.setCode(code);
            dataRegister.setUserId(result.getId());
            return new ResponseResult(1,
                    "Đăng ký tài khoản thành công vui lòng nhập mã xác thực để kích hoạt tài khoản", dataRegister);
        } else {

            return new ResponseResult(0, "Đăng ký tài khoản không thành công", "Register failed");
        }
    }

    @ExceptionHandler(ServiceException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Object handleAllServiceException(ServiceException e) {
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
