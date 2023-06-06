package vn.ecomos.ecom.restful;

import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.ecomos.ecom.base.controller.MainController;
import vn.ecomos.ecom.base.exception.EcomosException;
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
public class RegisterController extends MainController {


    @Autowired
    private UserManager userManager;
    @Autowired
    private UserCreateController userCreateController;

    @Value("${baddy.store.name}")
    private String mailName;
    @Value("${baddy.store.mail}")
    private String emailFrom;
    @Value("${baddy.password}")
    private String passwordEmail;
    @Autowired
    private CreateCartController createCartController;

    @ApiOperation(value = "register account")
    @PostMapping("/user")
    public ResponseResult registerUser(@RequestBody CreateUserInput createInput) {
        User result;
        try {
            result = userCreateController.createUser(createInput);
        } catch (EcomosException e) {
            return new ResponseResult(0, e.getErrorMessage(), e.getErrorDetail());
        }
        if (null != result) {
            String code = GeneralIdUtils.generateId();
            String messSendMail = code + " la ma xac thuc OTP dang ky tai khoan";
            String subject = "Ma xac Thuc OTP";
            Session session = SendMailUtils.loginMail(emailFrom, passwordEmail);
            try {
                SendMailUtils.sendMailTo(session,
                        emailFrom,
                        mailName,
                        result.getEmail(),
                        subject,
                        messSendMail);

            } catch (UnsupportedEncodingException | MessagingException e) {
                return new ResponseResult(0, "Email không hợp lệ", e.getStackTrace());
            }
            //Gửi mail thành công thì tạo cart cho user
            Cart cart = new Cart();
            cart.setUserId(result.getId());
            try {
                createCartController.createCart(cart, null);
            } catch (EcomosException e) {
                return new ResponseResult(0, e.getErrorMessage(), e.getErrorDetail());
            }
            DataRegister dataRegister = new DataRegister();
            dataRegister.setCode(code);
            dataRegister.setUserId(result.getId());
            return new ResponseResult(
                    1,
                    "Đăng ký tài khoản thành công vui lòng nhập mã xác thực để kích hoạt tài khoản",
                    dataRegister);
        } else {

            return new ResponseResult(
                    0,
                    "Đăng ký tài khoản không thành công",
                    "Register failed");
        }
    }

    private final static Logger LOGGER = LoggerFactory.getLogger(RegisterController.class);

    @ExceptionHandler(EcomosException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)//500 error
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
