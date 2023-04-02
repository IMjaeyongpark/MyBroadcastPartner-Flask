package DeBug.emotion.Controller;

import DeBug.emotion.Service.Service;
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



}
