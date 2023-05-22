package vn.mellow.ecom.manager;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.conversions.Bson;
import vn.mellow.ecom.base.filter.ResultList;
import vn.mellow.ecom.base.manager.BaseManager;
import vn.mellow.ecom.model.websocket.Message;
import vn.mellow.ecom.model.websocket.MessageFilter;


import java.util.Date;
import java.util.List;

/**
 * @author : Vũ Văn Minh
 * @mailto : duanemellow19@gmail.com
 * @created : 06/05/2023, Thứ Bảy
 **/
public class MessageManager extends BaseManager {
    public MessageManager(MongoClient mongoClient) {
        super(mongoClient);
    }

    private MongoCollection<Message> messageMongoCollection;

    public MongoCollection<Message> getMessageMongoCollection() {
        if (null == messageMongoCollection) {
            messageMongoCollection = getCollection(Message.class);
        }
        return messageMongoCollection;
    }

    public Message createMessage(String byFrom, String byTo, String mess) {
        Message me = new Message();
        me.setMessage(mess);
        me.setByFrom(byFrom);
        me.setByTo(byTo);
        me.setFromAt(new Date());
        me.setId(generateId());
        getMessageMongoCollection().insertOne(me);
        return me;
    }

    public ResultList filterMessage(MessageFilter filterData) {
        List<Bson> filter = getFilters(filterData);
        // add filter
        if (filterData.getByFrom() != null) {
            appendFilter(filterData.getByFrom(), "byFrom", filter);
        }
        if (filterData.getByTo() != null) {
            appendFilter(filterData.getByTo(), "byTo", filter);
        }
        return getResultList(getMessageMongoCollection(), filter, filterData.getOffset(), filterData.getMaxResult());
    }
}
