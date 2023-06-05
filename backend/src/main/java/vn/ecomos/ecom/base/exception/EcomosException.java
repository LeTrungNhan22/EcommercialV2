package vn.ecomos.ecom.base.exception;

import lombok.Data;

@Data
public class EcomosException extends Exception {
    protected String errorCode;
    protected String errorMessage;
    protected String errorDetail;

    public EcomosException(String errorCode, String errorMessage, String errorDetail) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorDetail = errorDetail;
    }

    public EcomosException(String message, Throwable cause, String errorCode, String errorMessage, String errorDetail) {
        super(message, cause);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorDetail = errorDetail;
    }
}
