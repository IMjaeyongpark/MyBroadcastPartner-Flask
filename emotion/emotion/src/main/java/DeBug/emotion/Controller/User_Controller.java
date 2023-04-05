package DeBug.emotion.Controller;

import DeBug.emotion.Service.User_Service;
import DeBug.emotion.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("User")
@Slf4j
@CrossOrigin("*")
public class User_Controller {

    public User_Controller(User_Service userService) {
        this.userService = userService;
    }

    private final User_Service userService;


    //몽고디비 데이터 가져오기 테스트


    @RequestMapping("/find_user")
    public String find_User(){
        String user_Email = userService.find_User().get(0).getEmail();
        return user_Email;
    }

    //몽고디비 데이터 삽입 테스트
    @RequestMapping("/new_user")
    public String insert_User(){
        User user = new User();
        return userService.insert_User(user);
    }

}
