package DeBug.emotion.Repository;

import DeBug.emotion.domain.BroadCastData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;

import java.util.List;
import java.util.Optional;

public class DB_BC_Repository {
    @Autowired
    BroadCastData_Repository mongoDBBroadCastDataRepository;

    //방송 정보 저장
    public String SaveBC(BroadCastData BCData){

        BroadCastData sampleBC = new BroadCastData();
        sampleBC.setBCID(BCData.getBCID());
        Example<BroadCastData> example = Example.of(sampleBC);
        Optional<BroadCastData> bcd  = mongoDBBroadCastDataRepository.findOne(example);

        try {
            if (bcd.isEmpty()) {
                mongoDBBroadCastDataRepository.insert(BCData);
            }
            return "200";
        }catch(Exception e){
            return "400";
        }
    }


    //방송 정보 가져오기
    public List<BroadCastData> find_BC(String email){

        try {
            List<BroadCastData> BCDs = mongoDBBroadCastDataRepository.findByemail(email);
            return BCDs;
        }catch(Exception e){
            System.out.println("re error: " + e.getMessage());
            return null;
        }
    }
}
