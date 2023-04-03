package DeBug.emotion.Controller;

import DeBug.emotion.Service.Service;
import DeBug.emotion.domain.Test;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@Slf4j
public class Controller {

    public Controller(Service service) {
        this.service = service;
    }

    private final Service service;


    @RequestMapping("/test")
    public String test(){
        String test = service.find_test().get(0).getName();
        return test;
    }
    @RequestMapping("/test2")
    public String test2(){
        Test test = new Test();
        test.setName("test2");
        test.setAge(10);
        return service.insert_test(test);
    }
}
