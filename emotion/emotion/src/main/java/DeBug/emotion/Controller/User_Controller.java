package DeBug.emotion.Controller;

import DeBug.emotion.Service.User_Service;
import lombok.extern.slf4j.Slf4j;
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
    
        try {

            String payload = idToken.split("[.]")[1];
            return userService.getSubject(payload);
        }
        catch (Exception e) {

            System.out.println("User_Controller error");
            return "400";
        }
    }

    @GetMapping("/identification")
    public String identification(@RequestParam("Email") String Email,@RequestParam("URI") String URI){
        //URI에서 BCID추출
        String BCID = URI.replace("https://www.youtube.com/watch?v=", "");
        return userService.identification(Email,URI,BCID);
    }

}
