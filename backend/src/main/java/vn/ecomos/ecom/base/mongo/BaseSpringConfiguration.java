package vn.ecomos.ecom.base.mongo;

import java.io.InputStream;
import java.util.Properties;

public class BaseSpringConfiguration {

    public static final String MONGO_DB_NAME = getPropertyName("mongodb.database", "Inventory");
    public static final String MONGO_DB_URI = getPropertyName("mongodb.uri", "mongodb://localhost");

    public static Properties applicationProperties;

    public static Properties profileProperties;

    public static Properties getApplicationProperties() {
        if (null == applicationProperties) {
            applicationProperties = getProperties("application.properties");
        }
        return applicationProperties;
    }


    public static Properties getProfileProperties() {
        if (null == profileProperties) {
            profileProperties = new Properties();
            profileProperties.putAll(getApplicationProperties());
            String activeProfile = getApplicationProperties().getProperty("spring.profiles.default");
            if (null != activeProfile && activeProfile.length() > 0) {
                Properties subProfileProperties = getProperties("application-" + activeProfile + ".properties");
                profileProperties.putAll(subProfileProperties);
            }
        }
        return profileProperties;
    }

    private static Properties getProperties(String propertiesFile) {
        Properties properties = new Properties();
        InputStream inputStream = ClientConnector.class.getClassLoader().getResourceAsStream(propertiesFile);
        try {
            properties.load(inputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return properties;
    }

    public static String getPropertyName(String name, String defaultValue) {
        String content = getProfileProperties().getProperty(name);
        if (null == content || content.length() == 0) {
            content = System.getProperty(name);
            if (null == content || content.length() == 0) {
                content = defaultValue;
            }
        }
        return content;
    }
}
