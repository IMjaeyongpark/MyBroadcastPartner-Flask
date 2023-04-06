package DeBug.emotion.Service;


import DeBug.emotion.Repository.DB_User_Repository;
import DeBug.emotion.domain.User;
import org.json.JSONObject;

import java.util.Base64;
import java.util.List;

public class User_Service {

    public User_Service(DB_User_Repository UserRepository) {
        this.UserRepository = UserRepository;
    }

    private final DB_User_Repository UserRepository;

    //토큰 디코딩하고 바디값 받아오기
    public String getSubject(String token){
        try{
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String subject = new String(decoder.decode(token));
        JSONObject payload = new JSONObject(subject);
        User user = new User();
        user.setName(payload.get("name").toString());
        user.setEmail(payload.get("email").toString());
        return UserRepository.insert_User(user);
        }catch(Exception e){
            System.out.println("ser");
            return "400";
        }
    }


    public List<User> find_User(){
        return UserRepository.find_User();
    }

    public String insert_User(User user){
        return UserRepository.insert_User(user);
    }
}
