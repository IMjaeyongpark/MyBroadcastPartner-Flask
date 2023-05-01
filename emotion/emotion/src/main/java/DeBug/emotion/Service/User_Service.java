package DeBug.emotion.Service;

import DeBug.emotion.Repository.DB_User_Repository;
import DeBug.emotion.domain.BroadCast;
import DeBug.emotion.domain.User;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class User_Service {

    public User_Service(DB_User_Repository UserRepository) {
        this.UserRepository = UserRepository;
    }

    private final DB_User_Repository UserRepository;

    //jwt토큰 바디값 디코딩 받아오기
    public String getSubject(String token){
        try{
            //바디 디코딩 후 json형태로 변환
            Base64.Decoder decoder = Base64.getUrlDecoder();
            String subject = new String(decoder.decode(token));
            JSONObject payload = new JSONObject(subject);

            //값 가져오기
            User user = new User();
            user.setName(payload.getString("name"));
            user.setEmail(payload.getString("email"));
            return UserRepository.insert_User(user);

        }catch(Exception e){

            System.out.println("service error");
            return "400";
        }
    }

    public String test(String token){
        try{
            //바디 디코딩 후 json형태로 변환
            Base64.Decoder decoder = Base64.getUrlDecoder();
            String subject = new String(decoder.decode(token));
            JSONObject payload = new JSONObject(subject);

            //값 가져오기
            User user = new User();
            user.setName(payload.getString("name"));
            user.setEmail(payload.getString("email"));
            List<BroadCast> BroadCastList = new ArrayList<BroadCast>();
            BroadCast test = new BroadCast();
            test.setBCID("test");
            BroadCastList.add(test);
            user.setBroadCast(BroadCastList);
            return UserRepository.insert_User(user);

        }catch(Exception e){

            System.out.println("service error");
            return "400";
        }
    }
}
