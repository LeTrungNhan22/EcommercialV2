package vn.ecomos.ecom.restful;

import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.ecomos.ecom.base.controller.MainController;
import vn.ecomos.ecom.base.exception.EcomosException;

import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.ResourceBundle;

@CrossOrigin(origins = "*", maxAge = 7200)// 2 hours.
@RestController
@RequestMapping("/language/1.0.0/language")
public class LanguageController extends MainController {
    @GetMapping("/changeLanguage")
    public LinkedHashMap<String, Object> changeLocale(@RequestParam("locale") String locale) {
        Locale localeParam = new Locale(locale);

        LinkedHashMap<String, Object> result = new LinkedHashMap<>();

        ResourceBundle resourceBundle = ResourceBundle.getBundle("lang", localeParam); // lang.properties

        for (String key : resourceBundle.keySet()) {
            result.put(key,
                    resourceBundle.getString(key)); // key = "hello", value = "Xin chào"
        }
        return result;

    }


}
