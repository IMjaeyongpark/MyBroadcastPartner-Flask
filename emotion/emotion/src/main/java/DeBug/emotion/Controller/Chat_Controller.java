package DeBug.emotion.Controller;

import DeBug.emotion.Service.Chat_Service;
import DeBug.emotion.domain.Chat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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

    //채팅 저장
    @PostMapping("/newChat")
    public String insertChat(@RequestParam("chat")String chat){
        return chatservice.insertChat(chat);
    }

    //채팅 불러오기
    @GetMapping("/find")
    public List<Chat> findChat(String BCID){
        return chatservice.findChat(BCID);
    }

}
