package DeBug.emotion.Repository;

import DeBug.emotion.domain.Chat;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DB_Chat_Repository {
    @Autowired
    Chat_Repository mongoDBchatRepository;

    //채팅 불러오기
    public List<Chat> findChat(String BCID){

        List<Chat> Chats = mongoDBchatRepository.findByBCID(BCID);
        return Chats;
    }

    //채팅 저장
    public String insertChat(Chat chat){
        try {
            mongoDBchatRepository.insert(chat);
            return "200";
        }catch(Exception e){
            System.out.println("re error" + e.getMessage());
            return "400";
        }
    }
}
