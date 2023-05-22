package vn.ecomos.ecom.base.model;


import lombok.Data;
import vn.ecomos.ecom.enums.CurrencyCode;

@Data
public class MoneyV2 {
    private double amount;
    private CurrencyCode currencyCode;

    public MoneyV2() {
    }


}
