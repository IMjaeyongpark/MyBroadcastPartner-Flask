package DeBug.emotion.Repository;

import DeBug.emotion.domain.BroadCast;
import DeBug.emotion.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public class MongoDB_Repository {

    @Autowired
    Repository mongoDBUserRepository;


    //회원정보가 없으면 db저장
    public User insert_User(User user) {

        //회원정보 가져오기
        User sampleUser = new User();
        sampleUser.setEmail(user.getEmail());
        Example<User> example = Example.of(sampleUser);
        Optional<User> u = mongoDBUserRepository.findOne(example);

        try {
            //없으면 저장
            if (u.isEmpty()) {
                mongoDBUserRepository.insert(user);
                return user;
            }
            return u.get();
        } catch (Exception e) {
            return null;
        }
    }

    //유저의 방송 정보 저장
    public User save_BroadCast(User user, String URI, String BCID) {

        //유저가 없으면 null반환
        if (user == null) return null;

        //방송정보 담기
        BroadCast BC = new BroadCast();
        BC.setURI(URI);
        BC.setBCID(BCID);
        List<BroadCast> tmp = user.getBroadCast();
        tmp.add(BC);
        user.setBroadCast(tmp);
        //방송정보 저장
        mongoDBUserRepository.save(user);
        return user;
    }


    //Email로 유저 찾기
//    private User find_UserByEmail(String email){
//        User sampleUser = new User();
//        sampleUser.setEmail(email);
//        Example<User> example = Example.of(sampleUser);
//        Optional<User> u  = mongoDBUserRepository.findOne(example);
//        try {
//            if (u.isEmpty()) {
//                return null;
//            }
//            return u.get();
//        }catch(Exception e){
//            return null;
//        }
//    }
}
