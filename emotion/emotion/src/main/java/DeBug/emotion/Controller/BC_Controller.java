package DeBug.emotion.Controller;

import DeBug.emotion.Service.BroadCastData_Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/BC")
@Slf4j
@CrossOrigin("*")
public class BC_Controller {
    public BC_Controller(BroadCastData_Service broadCastDataService) {
        this.broadCastDataService = broadCastDataService;
    }

    private final BroadCastData_Service broadCastDataService;
}
