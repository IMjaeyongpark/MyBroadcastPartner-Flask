package DeBug.emotion.Repository;

import DeBug.emotion.domain.BroadCast;
import DeBug.emotion.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;


@Transactional
public class MongoDB_Repository {

    @Autowired
    private User_Repository mongoDBUserUserRepository;

    @Autowired
    private BroadCast_Repository mongoDBBroadCastRepository;

    @Autowired
    private Author_Repositoy mongoDBAuthorRepository;
    @Autowired
    private Chat_Repository mongoChatRepository;


    //회원정보가 없으면 db저장
    public User insert_User(User user) {

        User u = mongoDBUserUserRepository.findOneBy_id(user.get_id());
        //없으면 저장
        if (u==null) {
            mongoDBUserUserRepository.insert(user);
            return user;
        }
        return u;
    }

    //유저의 방송 정보 저장
    public String save_BroadCast(BroadCast BC) {
        //방송정보 저장
        try {
            mongoDBBroadCastRepository.save(BC);
            return "200";
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return "400";
        }
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
