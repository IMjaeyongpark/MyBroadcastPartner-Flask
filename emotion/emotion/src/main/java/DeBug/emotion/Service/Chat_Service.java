package DeBug.emotion.Service;

import DeBug.emotion.Repository.DB_Chat_Repository;

public class Chat_Service {

    public Chat_Service(DB_Chat_Repository chatRepository) {
        this.chatRepository = chatRepository;
    }

    private final DB_Chat_Repository chatRepository;
}
