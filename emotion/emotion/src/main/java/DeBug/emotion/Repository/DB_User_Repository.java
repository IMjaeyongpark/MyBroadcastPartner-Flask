package DeBug.emotion.Repository;

import DeBug.emotion.domain.BroadCast;
import DeBug.emotion.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public class DB_User_Repository{

    @Autowired
    User_Repository mongoDBUserRepository;

    public List<User> find_User(){
        return mongoDBUserRepository.findAll();
    }

    //회원정보가 없으면 db저장
    public String insert_User(User user){

        //회원정보 가져오기
        User sampleUser = new User();
        sampleUser.setEmail(user.getEmail());
        Example<User> example = Example.of(sampleUser);
        Optional<User> u  = mongoDBUserRepository.findOne(example);

        try {
            //없으면 저장
            if (u.isEmpty()) {
                mongoDBUserRepository.insert(user);
            }
            return "200";
        }catch(Exception e){
            return "400";
        }
    }

    //유저의 방송 정보 저장
    public String save_BroadCast(String Email,String URI,String BCID){
        //유저 조회
        User user = find_UserByEmail(Email);
        //유저가 없으면 400반환
        if(user == null)return "400";

        //방송정보 담기
        BroadCast BC = new BroadCast();
        BC.setURI(URI);
        BC.setBCID(BCID);
        List<BroadCast> tmp = user.getBroadCast();
        tmp.add(BC);
        user.setBroadCast(tmp);
        //방송정보 저장
        mongoDBUserRepository.save(user);
        return "200";
    }


    //Email로 유저 찾기
    private User find_UserByEmail(String email){
        User sampleUser = new User();
        sampleUser.setEmail(email);
        Example<User> example = Example.of(sampleUser);
        Optional<User> u  = mongoDBUserRepository.findOne(example);
        try {
            if (u.isEmpty()) {
                return null;
            }
            return u.get();
        }catch(Exception e){
            return null;
        }
    }
}
