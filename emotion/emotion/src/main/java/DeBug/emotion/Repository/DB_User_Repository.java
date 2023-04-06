package DeBug.emotion.Repository;

import DeBug.emotion.domain.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class DB_User_Repository {


    @Autowired
    User_Repository mongoDBUserRepository;



    public List<User> find_User(){
        return mongoDBUserRepository.findAll();
    }

    public String insert_User(User user){
        try {
            if (true) {
                mongoDBUserRepository.insert(user);
            }
        }catch(Exception e){
            System.out.println("re");
        }
        return "200";
    }

}
