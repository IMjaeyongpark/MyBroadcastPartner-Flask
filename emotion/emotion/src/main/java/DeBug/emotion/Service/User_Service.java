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
            user.setLocale(payload.getString("locale"));
            return UserRepository.insert_User(user);

        }catch(Exception e){

            System.out.println("service error");
            return "400";
        }
    }

    //본인 인증 및 방송정보 저장
    public String identification(String Email,String URI,String BCID){


        return UserRepository.save_BroadCast(Email,URI,BCID);
    }
}
