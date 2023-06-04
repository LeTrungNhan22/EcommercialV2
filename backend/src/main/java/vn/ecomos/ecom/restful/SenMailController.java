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
import vn.ecomos.ecom.enums.ServiceType;
import vn.ecomos.ecom.manager.UserManager;
import vn.ecomos.ecom.utils.GeneralIdUtils;
import vn.ecomos.ecom.utils.SendMailUtils;
import vn.ecomos.ecom.base.model.ResponseResult;
import vn.ecomos.ecom.model.user.User;
import vn.ecomos.ecom.model.user.UserFilter;

import javax.mail.MessagingException;
import javax.mail.Session;
import java.io.UnsupportedEncodingException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/mail/1.0.0/")
public class SenMailController extends BaseController {
    private final static Logger LOGGER = LoggerFactory.getLogger(SenMailController.class);

    @Autowired
    private UserManager userManager;
    @Autowired
    private UserController userController;

    @Value("${ecommerce_floor.store.name}")
    private String storeName;
    @Value("${ecommerce_floor.store.mail}")
    private String emailEcommerce;
    @Value("${mellow.password}")
    private String passwordEcommerce;


    @ApiOperation(value = "send email")
    @PostMapping("/send")
    public ResponseResult sendMail(@RequestParam("email") String email) throws ServiceException {

        UserFilter filterUser = new UserFilter();
        filterUser.setEmail(email);
        filterUser.setServiceType(ServiceType.NORMALLY);
        User result = userController.searchUser(filterUser).getResultList().get(0);
        if (null != result) {
            String code = GeneralIdUtils.generateId();
            String subject = "Ma xac Thuc";
            String messSendMail = code + " la ma xac thuc OTP tai khoan tren san thuong mai MELLOW. " +
                    "De tranh bi mat tien, tuyet doi KHONG chia se ma nay voi bat ky ai.";

            Session session = SendMailUtils.loginMail(emailEcommerce, passwordEcommerce);

            try {
                SendMailUtils.sendMailTo(session, emailEcommerce, storeName, result.getEmail(), subject, messSendMail);

            } catch (UnsupportedEncodingException | MessagingException e) {
                return new ResponseResult(0, e.getMessage(), e.getStackTrace());
            }
            //Send mail to store

            return new ResponseResult(1, "Gửi mã xác thực thành công.", code);
        } else {
            return new ResponseResult(0, "Gửi mã xác thực không thành công.Không tìm thấy thông tin tài khoản", "Register failed");
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
