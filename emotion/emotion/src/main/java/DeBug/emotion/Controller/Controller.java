package DeBug.emotion.Controller;

import DeBug.emotion.Service.Service;
import DeBug.emotion.domain.Chat;
import DeBug.emotion.domain.Total_Data;
import DeBug.emotion.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@CrossOrigin("*")
public class Controller {

    public Controller(Service userService) {
        this.userService = userService;
    }

    private final Service userService;

    //토큰 받아오기
    @GetMapping("/find")
    public String find_User(@RequestParam("id_token") String idToken,@RequestParam("access_token") String access_token) {
        //jwt PAYLOAD부분 추출
        String payload = idToken.split("[.]")[1];
        User user = userService.getSubject(payload,access_token);
        if (user == null) return "400";
        return "200";
    }

    //본인확인
    @RequestMapping("/identification")
    public String identification(@RequestParam("email") String email,
                                 @RequestParam("URI") String URI) {

        User user = new User();
        user.set_id(email);
        //URI에서 BCID추출
        String BCID = URI.replace("https://", "").replace("www.", "")
                .replace("youtube.com/watch?v=", "");

        return userService.identification(user, URI, BCID);
    }


    //채팅 저장 및 전달
    @RequestMapping("/chat")
    public String chat(@RequestParam("email") String email,
                       @RequestBody Chat chat, @RequestParam("BCID") String BCID,
                       @RequestParam("name") String name) {
        User user = new User();
        user.set_id(email);
        userService.chat(user,chat, BCID, name);
        return "200";
    }

    //마이페이지 데이터
    @GetMapping("/mypage")
    public Total_Data mypage(@RequestParam("email")String email) {
        User user = new User();
        user.set_id(email);
        return userService.mypageData(user);
    }

    //채널 아이디
    @GetMapping("/channel_ID")
    public String channel_ID(@RequestParam("email")String email) {
        return userService.channel_ID(email);
    }



    @GetMapping("/testdata")
    public String testdata(){

        userService.testdata();

        return "200";
    }

}
