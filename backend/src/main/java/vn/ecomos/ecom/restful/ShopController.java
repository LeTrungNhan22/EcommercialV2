package vn.ecomos.ecom.restful;

import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.ecomos.ecom.base.controller.MainController;
import vn.ecomos.ecom.base.exception.ClientException;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.client.GHNClient;
import vn.ecomos.ecom.enums.ActiveStatus;
import vn.ecomos.ecom.enums.RoleType;
import vn.ecomos.ecom.manager.UserManager;
import vn.ecomos.ecom.model.input.CreateShopIP;
import vn.ecomos.ecom.model.input.ShopGHNInput;
import vn.ecomos.ecom.model.input.ShopUpdateInput;
import vn.ecomos.ecom.model.shop.Shop;
import vn.ecomos.ecom.model.user.User;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user/1.0.0/shop")
public class ShopController extends MainController {
    private final static Logger LOGGER = LoggerFactory.getLogger(ShopController.class);
    @Value("${GHN.url}")
    private String url;
    @Value("${GHN.token}")
    private String token;
    @Autowired
    private UserManager userManager;

    private void validateShopInput(String userId, CreateShopIP shopInput) throws EcomosException {
        if (userId == null || userId.isEmpty()) {
            throw new EcomosException("not_found", "Vui lòng truyền mã tài khoản", "userId is empty");
        }

        if (shopInput == null) {
            throw new EcomosException("not_found", "Vui lòng truyền thông tin cửa hàng của bạn", "shop is empty");
        }

        if (null == shopInput.getAddress() || 0 == shopInput.getDistrict_id()
                || null == shopInput.getWardCode()) {
            throw new EcomosException("not_found", "Vui lòng truyền địa chỉ của cửa hàng bạn", "shopId is empty");
        }
        if (null == shopInput.getPhone()) {
            throw new EcomosException("not_found", "Vui lòng truyền số điện thoại của cửa hàng bạn", "phone is empty");
        }

        if (null == shopInput.getName()) {
            throw new EcomosException("not_found", "Vui lòng truyền tên cửa hàng của bạn", "shopName is empty");
        }
        if (null == shopInput.getImageUrl()) {
            throw new EcomosException("not_found", "Vui lòng truyền logo của cửa hàng bạn", "imageUrl is empty");
        }
    }

    private GHNClient getGHNClient() {
        return new GHNClient(url);
    }

    @ApiOperation("create shop from user")
    @PostMapping("/create")
    public User createShop(@RequestParam("user-id") String userId, @RequestBody CreateShopIP shopInput) throws EcomosException {
        User user = userManager.getUser(userId);
        if (user == null) {
            throw new EcomosException("not_found", "Không tìm thấy thông tin tài khoản :" + userId, "user is empty");
        }
        //validate shop
        validateShopInput(userId, shopInput);
        //update role
        userManager.updateRole(userId, RoleType.PERSONAL_STORE, user.getByUser());
        Shop shop = new Shop();
        int shopId = createShopShipmentGHN(shopInput);
        shop.setShopId(shopId);
        if (null == shopInput.getImageUrl()) {
            String imageUrl = shopInput.getName() == null ? user.getUsername() : shopInput.getName();
            shopInput.setImageUrl("https://ui-avatars.com/api/?name=" + imageUrl.replaceAll(" ", ""));
        }
        shop.setImageUrl(shopInput.getImageUrl());
        shop.setStatus(ActiveStatus.ACTIVE);
        shop.setName(shopInput.getName());
        shop.setPhone(shopInput.getPhone());
        shop.setAddress(shopInput.getAddressShop());
        shop.setDescription(shopInput.getDescription());

        return userManager.createShop(userId, shop);
    }

    @ApiOperation("update shop ")
    @PutMapping("/shop/update/info")
    public Shop updateShop(@RequestParam("user-id") String userId,
                           @RequestParam("shop-id") int shopId,
                           @RequestBody ShopUpdateInput shop) {
        userManager.updateShop(userId, shopId, shop);
        return userManager.getUserShop(shopId).getShop();
    }

    @ApiOperation("update shop address")
    @PutMapping("/shop/update/address")
    public Shop updateShopAddress(@RequestParam("shop-id") int shopId,
                                  @RequestParam("province-code") int provinceCode,
                                  @RequestParam("district-code") int districtCode,
                                  @RequestParam("ward-code") int wardCode
            , @RequestParam("address") String address) throws EcomosException {
        userManager.updateAddressShop(shopId, provinceCode, districtCode, wardCode, address);
        return getInfoShop(shopId);
    }


    private Integer createShopShipmentGHN(CreateShopIP shopInput) throws EcomosException {
        Integer shopId = null;
        try {
            ShopGHNInput shopGHNInput = new ShopGHNInput();
            shopGHNInput.setDistrict_id(shopInput.getDistrict_id());
            shopGHNInput.setWard_code(shopInput.getWardCode());
            shopGHNInput.setAddress(shopInput.getAddress());
            shopGHNInput.setPhone(shopInput.getPhone());
            shopGHNInput.setName(shopInput.getName());
            String current = getGHNClient().createShop(token, shopGHNInput).getData().toString();
            shopId = Integer.valueOf(current.substring(10, current.length() - 3));

        } catch (ClientException e) {
            throw new EcomosException(e.getErrorCode(), e.getErrorMessage(), e.getErrorDetail());
        }
        return shopId;
    }

    @ApiOperation(value = "get shop by shop id")
    @GetMapping("/shop/{shopId}")
    public Shop getInfoShop(@PathVariable int shopId) throws EcomosException {
        return userManager.getInfoShop(shopId);
    }

    @ApiOperation(value = "get shop list")
    @GetMapping("/shop/all")
    public List<Shop> getShopAll() {
        List<Shop> shops = new ArrayList<Shop>();
        List<User> users = userManager.getShops();
        if (users != null) {
            users.forEach(user -> {
                Shop shop = user.getShop();
                shops.add(shop);
            });
        }
        return shops;
    }

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
