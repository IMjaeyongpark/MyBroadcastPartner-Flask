package DeBug.emotion.Service;

import DeBug.emotion.Repository.DB_BC_Repository;
import DeBug.emotion.domain.BroadCastData;
import org.json.JSONObject;

import java.util.List;


public class BroadCastData_Service {
    private final DB_BC_Repository BCDRepository;

    public BroadCastData_Service(DB_BC_Repository BCDRepository) {
        this.BCDRepository = BCDRepository;
    }

    //방송 정보 저장
    public String SaveBC(JSONObject data) {

        BroadCastData BCData = new BroadCastData();
        try {
            BCData.setBCID(data.getString("id"));
            BCData.setTitle(data.getString("title"));
            BCData.setThumbnailsUrl(data.getString("thumbnails"));
            BCData.setActualStartTime(data.getString("actualStartTime"));
            return BCDRepository.SaveBC(BCData);
        }catch (Exception e){
            System.out.println("Service error: " + e.getMessage());
            return "400";
        }
    }

    //방송 정보 가져오기
    public List<BroadCastData> find_BC(String email){
        return BCDRepository.find_BC(email);
    }
}
