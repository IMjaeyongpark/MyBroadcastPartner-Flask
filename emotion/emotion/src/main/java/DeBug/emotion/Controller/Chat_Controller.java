package DeBug.emotion.Controller;

import DeBug.emotion.Service.Chat_Service;
import DeBug.emotion.domain.Chat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Provider;
import java.util.List;

@RestController

@RequestMapping("/Chat")
@Slf4j
@CrossOrigin("*")
public class Chat_Controller {
    public Chat_Controller(Chat_Service chatservice) {
        this.chatservice = chatservice;
    }

    private final Chat_Service chatservice;

    @PostMapping("/find")
    public List<Chat> findChat(String BCID){
        return chatservice.findChat(BCID);
    }
}
