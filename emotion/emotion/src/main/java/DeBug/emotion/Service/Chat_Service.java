package DeBug.emotion.Service;

import DeBug.emotion.Repository.DB_Chat_Repository;
import DeBug.emotion.domain.Chat;
import org.json.JSONObject;

import java.util.List;

public class Chat_Service {

    public Chat_Service(DB_Chat_Repository chatRepository) {
        this.chatRepository = chatRepository;
    }

    private final DB_Chat_Repository chatRepository;

    //채팅 불러오기
    public List<Chat> findChat(String BCID){
        return chatRepository.findChat(BCID);
    }

    //채팅 저장
    public String insertChat(String chat){
        Chat new_chat = new Chat();
        JSONObject j_chat = new JSONObject(chat);

        new_chat.setBCID(j_chat.getString("BCID"));
        new_chat.setName(j_chat.getString("name"));
        new_chat.setMessage(j_chat.getString("message"));
        new_chat.setDateTime(j_chat.getString("dateTime"));
        new_chat.setEmotion1(j_chat.getString("emotion1"));
        new_chat.setEmotion2(j_chat.getString("emotion2"));

        return chatRepository.insertChat(new_chat);
    }
}
