package DeBug.emotion.Repository;

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

    //회원정보가 있으면 db저장
    public String insert_User(User user){

        User sampleUser = new User();
        sampleUser.setEmail(user.getEmail());
        Example<User> example = Example.of(sampleUser);
        Optional<User> u  = mongoDBUserRepository.findOne(example);


        try {
            if (u.isEmpty()) {
                mongoDBUserRepository.insert(user);
            }
            return "200";
        }catch(Exception e){
            return "400";
        }
    }

}
