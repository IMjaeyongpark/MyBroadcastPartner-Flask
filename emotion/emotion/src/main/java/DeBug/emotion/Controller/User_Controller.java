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
    public String find_User(@RequestParam("id_token") String idToken, HttpServletRequest request,
                            @SessionAttribute(name = "User", required = false) User login) {

        if (login != null) {
            return "200";
        }
        //jwt PAYLOAD부분 추출
        String payload = idToken.split("[.]")[1];
        User user = userService.getSubject(payload);
        if (user == null) return "400";
        return save_session(user, request);
    }

    //본인확인
    @GetMapping("/identification")
    public String identification(@SessionAttribute(name = "User", required = false) User user,
                                 @RequestParam("URI") String URI, HttpServletRequest request) {
        //URI에서 BCID추출
        String BCID = URI.replace("https://", "").replace("www.","")
                .replace("youtube.com/watch?v=", "");
        return userService.identification(user, URI, BCID);
    }

    //세션 업데이트
    private String save_session(User user, HttpServletRequest request) {
        try {
            HttpSession session = request.getSession();
            session.setAttribute("User", user);
            return "200";
        } catch (Exception e) {
            System.out.println("세션 저장 실패");
            return "400";
        }
    }


    //로그아웃 세션 정보 삭제
    @RequestMapping("/logout")
    public String logout(HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "200";
    }

}
