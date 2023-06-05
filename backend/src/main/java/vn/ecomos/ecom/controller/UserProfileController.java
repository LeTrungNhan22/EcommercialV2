package vn.ecomos.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.ecomos.ecom.base.exception.EcomosException;
import vn.ecomos.ecom.enums.UserStatus;
import vn.ecomos.ecom.manager.ScoreManager;
import vn.ecomos.ecom.manager.UserManager;
import vn.ecomos.ecom.model.user.Score;
import vn.ecomos.ecom.model.user.User;
import vn.ecomos.ecom.model.user.UserProfile;

@Component
public class UserProfileController {
    @Autowired
    private UserManager userManager;

    @Autowired
    private ScoreManager scoreManager;

    public UserProfile getUserProfile(String userId) throws EcomosException {
        if (null == userId || userId.length() == 0 || "null".equalsIgnoreCase(userId)) {
            throw new EcomosException("invalid_data", "Vui lòng nhập id user cần tìm", "user id is null");

        }

        User data = userManager.getUser(userId);
        if (null == data || !data.getUserStatus().equals(UserStatus.ACTIVE)) {
            throw new EcomosException("not_found", "Không tìm thấy thông tin user", "Not found data user by id: " + userId);
        }
        UserProfile result = userManager.getUserProfile(userId);

        Score score = scoreManager.getScore(userId);
        if (null != score) {
            result.setScore(score);
        }
        return result;
    }
}
