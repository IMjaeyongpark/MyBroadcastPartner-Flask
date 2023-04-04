package DeBug.emotion.Controller;

import DeBug.emotion.Service.Service;
import DeBug.emotion.domain.Test;
import DeBug.emotion.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@CrossOrigin("*")
public class Controller {

    public Controller(Service service) {
        this.service = service;
    }

    private final Service service;


    //몽고디비 데이터 가져오기 테스트
    @RequestMapping("/test")
    public String test(){
        String test = service.find_test().get(0).getId();
        return test;
    }

    //몽고디비 데이터 삽입 테스트
    @RequestMapping("/test2")
    public String test2(){
        Test test = new Test();
        test.setName("test2");
        test.setAge(10);
        return service.insert_test(test);
    }

    @RequestMapping("/find")
    public String find_User(){
        String user_Email = service.find_User().get(0).getEmail();
        return user_Email;
    }

    //몽고디비 데이터 삽입 테스트
    @RequestMapping("/new")
    public String insert_User(){
        User user = new User();
        user.setEmail("test@example.com");
        user.setChannel_Name("test_channel");
        user.setAge(20);
        user.setName("test_name");
        return service.insert_User(user);
    }

}
