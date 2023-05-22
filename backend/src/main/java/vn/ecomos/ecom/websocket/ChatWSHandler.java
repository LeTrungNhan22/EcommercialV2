package vn.ecomos.ecom.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import vn.ecomos.ecom.model.websocket.Message;

import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author : Vũ Văn Minh
 * @mailto : duanemellow19@gmail.com
 * @created : 06/05/2023, Thứ Bảy
 **/
@Service
public class ChatWSHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userId = getUserIdFromSession(session);
        sessions.put(userId, session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String userId = getUserIdFromSession(session);
        String payload = message.getPayload();
        ObjectMapper mapper = new ObjectMapper();
        Message chatMessage = mapper.readValue(payload, Message.class);
        chatMessage.setByFrom(userId);
        String json = mapper.writeValueAsString(chatMessage);
        for (WebSocketSession otherSession : sessions.values()) {
            if (!otherSession.equals(session)) {
                otherSession.sendMessage(new TextMessage(json));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String userId = getUserIdFromSession(session);
        sessions.remove(userId);
    }

    private String getUserIdFromSession(WebSocketSession session) {
        // Lấy ID của người dùng từ session
        // Ví dụ: Lấy ID từ query parameter trong URL
        String queryString = Objects.requireNonNull(session.getUri()).getQuery();
        String[] params = queryString.split("&");
        for (String param : params) {
            String[] keyValue = param.split("=");
            if (keyValue[0].equals("userId")) {
                return keyValue[1];
            }
        }
        return null;
    }
}
