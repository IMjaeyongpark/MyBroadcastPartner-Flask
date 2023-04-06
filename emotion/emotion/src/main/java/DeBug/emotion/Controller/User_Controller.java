package DeBug.emotion.Controller;

import DeBug.emotion.Service.User_Service;
import DeBug.emotion.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/User")
@Slf4j
@CrossOrigin("*")
public class User_Controller {

    public User_Controller(User_Service userService) {
        this.userService = userService;
    }

    private final User_Service userService;

    //토큰 받아오기
    @GetMapping("/find")
    public String find_User(@RequestParam("id_token") String idToken){
        System.out.println(idToken);
        try {
            String payload = idToken.split("[.]")[1];
            return userService.getSubject(payload);
        }
        catch (Exception e) {
            System.out.println("con");
            return "400";
        }
    }

    //몽고디비 데이터 삽입 테스트
    @RequestMapping("/new_user")
    public String insert_User(){
        User user = new User();
        return userService.insert_User(user);
    }

}
