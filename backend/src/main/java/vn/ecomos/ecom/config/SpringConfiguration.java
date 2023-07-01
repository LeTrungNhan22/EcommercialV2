package vn.ecomos.ecom.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vn.ecomos.ecom.base.mongo.BaseSpringConfiguration;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

@Configuration
public class SpringConfiguration {

    @Bean
    public MongoClient mongoClient() {
        CodecRegistry pojoCodecRegistry = fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(), pojoCodecRegistry);

        return MongoClients.create(MongoClientSettings.builder()
                .codecRegistry(codecRegistry)
                .applyConnectionString(new ConnectionString(BaseSpringConfiguration.MONGO_DB_URI))
                .applyToConnectionPoolSettings(builder -> builder
                        .maxSize(100)
                        .maxConnectionLifeTime(1000 * 60 * 60 * 24 * 7, java.util.concurrent.TimeUnit.MILLISECONDS))
                .applyToSocketSettings(builder -> builder
                        .connectTimeout(1000 * 60 * 60 * 24 * 7, java.util.concurrent.TimeUnit.MILLISECONDS)
                        .readTimeout(1000 * 60 * 60 * 24 * 7, java.util.concurrent.TimeUnit.MILLISECONDS))
                .build());
    }

}
