package vn.ecomos.ecom.client;

import vn.ecomos.ecom.base.client.BaseClient;
import vn.ecomos.ecom.base.exception.ClientException;
import vn.ecomos.ecom.model.bank.Bank;
import vn.ecomos.ecom.model.bank.ResultBank;
import vn.ecomos.ecom.model.bank.ResultHistory;

import java.net.MalformedURLException;
import java.net.URL;

public class BankClient extends BaseClient {

    public BankClient(String service) {
        super(service);
    }

    public ResultBank<Bank> getBankList() throws ClientException {
        return getResponseBankList("/v2/banks", Bank.class);
    }

    public URL getQRImage(String bankID, String accountNo, String template
            , double amount, String addInfo, String accountName) throws ClientException, MalformedURLException {

        return new URL(service + "/image/" + bankID + "-" + accountNo + "-" + template + ".png?amount=" + amount + "&addInfo=" + addInfo + "&accountName=" + accountName);
    }

    public ResultHistory getHistoryBank(String token) throws ClientException {
        return get("/v2/transactions?fromDate=2021-04-01&toDate=2022-07-05&page=4&pageSize=20&sort=ASC", ResultHistory.class, token);
    }
}
