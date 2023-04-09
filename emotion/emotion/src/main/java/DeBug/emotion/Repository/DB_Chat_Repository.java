package DeBug.emotion.Repository;

import DeBug.emotion.domain.Chat;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DB_Chat_Repository {
    @Autowired
    Chat_Repository mongoDBchatRepository;

    public List<Chat> findChat(String BCID){

        List<Chat> Chats = mongoDBchatRepository.findByBCID(BCID);
        return Chats;
    }
}
