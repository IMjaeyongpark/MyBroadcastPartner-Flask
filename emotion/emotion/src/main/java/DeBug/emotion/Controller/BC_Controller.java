package DeBug.emotion.Controller;

import DeBug.emotion.Service.BroadCastData_Service;
import DeBug.emotion.domain.BroadCastData;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/BC")
@Slf4j
@CrossOrigin("*")
public class BC_Controller {
    public BC_Controller(BroadCastData_Service broadCastDataService) {
        this.broadCastDataService = broadCastDataService;
    }

    private final BroadCastData_Service broadCastDataService;

    //방송 데이터 저장
    @PostMapping ("/new")
    public String SaveBC(@RequestParam("Data") String data) {
        JSONObject Json_data = new JSONObject(data);
        return broadCastDataService.SaveBC(Json_data);
    }

    //방송 정보 가져오기
    @GetMapping("/find_BC")
    public List<BroadCastData> FindBC(@RequestParam("Email") String Email) {
        return broadCastDataService.find_BC(Email);
    }

}
