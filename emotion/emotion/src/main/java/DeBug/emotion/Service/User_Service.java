package DeBug.emotion.Service;

import DeBug.emotion.Repository.MongoDB_Repository;
import DeBug.emotion.domain.BroadCast;
import DeBug.emotion.domain.User;
import org.json.JSONObject;

import java.util.Base64;
import java.util.List;

public class User_Service {

    public User_Service(MongoDB_Repository mongoDB_Repository) {
        this.mongoDB_Repository = mongoDB_Repository;
    }

    private final MongoDB_Repository mongoDB_Repository;

    //jwt토큰 바디값 디코딩 받아오기
    public User getSubject(String token) {
        try {
            //바디 디코딩 후 json형태로 변환
            Base64.Decoder decoder = Base64.getUrlDecoder();
            String subject = new String(decoder.decode(token));
            JSONObject payload = new JSONObject(subject);

            //값 가져오기
            User user = new User();
            user.setName(payload.getString("name"));
            user.setEmail(payload.getString("email"));
            user.setLocale(payload.getString("locale"));
            user.setPicture(payload.getString("picture"));
            return mongoDB_Repository.insert_User(user);

        } catch (Exception e) {

            System.out.println("service error");
            return null;
        }
    }

    //본인 인증 및 방송정보 저장
    public User identification(User user, String URI, String BCID) {

        //유저가 없으면 null반환
        if (user == null) return null;

        //방송정보 담기
        BroadCast BC = new BroadCast();
        BC.setURI(URI);
        BC.setBCID(BCID);
        List<BroadCast> tmp = user.getBroadCast();
        tmp.add(BC);
        user.setBroadCast(tmp);

        return mongoDB_Repository.save_BroadCast(user);
    }
}
