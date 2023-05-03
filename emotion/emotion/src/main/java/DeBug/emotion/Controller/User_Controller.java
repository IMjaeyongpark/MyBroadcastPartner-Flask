package DeBug.emotion.Controller;

import DeBug.emotion.Service.User_Service;
import DeBug.emotion.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
    public String find_User(@RequestParam("id_token") String idToken, HttpServletRequest request) {

        try {
            //jwt PAYLOAD부분 추출
            String payload = idToken.split("[.]")[1];
            User user = userService.getSubject(payload);
            if (user == null) return "400";
            return save_session(user, request);
        } catch (Exception e) {

            System.out.println("User_Controller error");
            return "400";
        }
    }

    //본인확인
    @GetMapping("/identification")
    public String identification(@SessionAttribute(name = "Email", required = false) User user,
                                 @RequestParam("URI") String URI, HttpServletRequest request) {
        //URI에서 BCID추출
        String BCID = URI.replace("https://www.youtube.com/watch?v=", "");
        User tmp = userService.identification(user, URI, BCID);
        if (tmp == null) return "400";
        return save_session(tmp, request);
    }

    //세션 업데이트
    private String save_session(User user, HttpServletRequest request) {

        try {
            HttpSession session = request.getSession();
            session.setAttribute(user.getEmail(), user);
            return "200";
        } catch (Exception e) {
            System.out.println("세션 저장 실패");
            return "400";
        }
    }

}
