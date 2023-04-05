package DeBug.emotion.Repository;

import DeBug.emotion.domain.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DB_User_Repository {


    @Autowired
    User_Repository mongoDBUserRepository;



    public List<User> find_User(){
        return mongoDBUserRepository.findAll();
    }

    public String insert_User(User user){
        mongoDBUserRepository.insert(user);
        return "200";
    }


}
