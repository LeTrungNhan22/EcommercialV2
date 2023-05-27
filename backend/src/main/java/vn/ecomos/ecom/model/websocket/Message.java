package vn.ecomos.ecom.model.websocket;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonId;
import org.springframework.data.annotation.Id;

import java.util.Date;


@Data
public class Message {
    @Id
    @BsonId
    private String id;
    private String byFrom;
    private String byTo;
    private String message;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date fromAt;
}
