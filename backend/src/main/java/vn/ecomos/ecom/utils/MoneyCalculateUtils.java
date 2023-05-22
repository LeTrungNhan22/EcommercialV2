package vn.ecomos.ecom.utils;


import vn.ecomos.ecom.enums.CurrencyCode;
import vn.ecomos.ecom.base.model.MoneyV2;

public class MoneyCalculateUtils {

    public static MoneyV2 cloneMoney(MoneyV2 cloneValue, double amount){
        if(null==cloneValue){
            cloneValue = new MoneyV2();
            cloneValue.setCurrencyCode(CurrencyCode.VND);
        }
        MoneyV2 moneyV2 = new MoneyV2();
        moneyV2.setCurrencyCode(cloneValue.getCurrencyCode());
        moneyV2.setAmount(amount);
        return moneyV2;
    }

    public static MoneyV2 getMoney(double value){
        MoneyV2 moneyV2 = new MoneyV2();
        moneyV2.setCurrencyCode(CurrencyCode.VND);
        moneyV2.setAmount(value);
        return moneyV2;
    }

    public static double getMoneyAmount(MoneyV2 value){
        if(null!=value){
            return value.getAmount();
        }
        return 0;
    }
}
