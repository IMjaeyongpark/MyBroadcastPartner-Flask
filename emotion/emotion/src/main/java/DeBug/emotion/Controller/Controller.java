package DeBug.emotion.Controller;

import DeBug.emotion.Service.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
public class Controller {

    public Controller(Service service) {
        this.service = service;
    }

    private final Service service;
    @RequestMapping("/test")
    public String test(){
        return "200";
    }
}
