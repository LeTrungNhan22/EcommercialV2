package vn.ecomos.ecom.utils;

public class GeneralIdUtils {
    public static String generateId() {
        return String.valueOf(
                (int) Math.floor(
                        ((Math.random() * 899999) + 100000)));// 6 digits
    }

}
