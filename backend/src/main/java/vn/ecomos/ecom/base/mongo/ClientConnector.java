package vn.ecomos.ecom.base.mongo;

import java.util.logging.Logger;

public class ClientConnector {

    static Logger logger;

    public static Logger getLogger() {
        if (null == logger) {
            logger = Logger.getLogger(ClientConnector.class.getSimpleName());
        }
        return logger;
    }
}