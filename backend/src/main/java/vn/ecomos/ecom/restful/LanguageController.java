package vn.ecomos.ecom.restful;

import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.ecomos.ecom.base.controller.BaseController;
import vn.ecomos.ecom.base.exception.ServiceException;

import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.ResourceBundle;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/language/1.0.0/language")
public class LanguageController extends BaseController {
    private final static Logger LOGGER = LoggerFactory.getLogger(LanguageController.class);

    @ApiOperation(value = "change language")
    @GetMapping("/change")
    public LinkedHashMap<String, Object> changeLocale(@RequestParam("locale") String locale) {
        LinkedHashMap<String, Object> result = new LinkedHashMap<>();
        ResourceBundle resourceBundle = ResourceBundle.getBundle("language", new Locale(locale));
        for (String rb : resourceBundle.keySet()) {
            result.put(rb, resourceBundle.getString(rb));
        }
        return result;
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
