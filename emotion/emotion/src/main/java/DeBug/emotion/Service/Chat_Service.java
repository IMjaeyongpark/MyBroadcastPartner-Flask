package DeBug.emotion.Service;

import DeBug.emotion.Repository.DB_Chat_Repository;
import DeBug.emotion.domain.Chat;

import java.util.List;

public class Chat_Service {

    public Chat_Service(DB_Chat_Repository chatRepository) {
        this.chatRepository = chatRepository;
    }

    private final DB_Chat_Repository chatRepository;

    public List<Chat> findChat(String BCID){
        return chatRepository.findChat(BCID);
    }
}
