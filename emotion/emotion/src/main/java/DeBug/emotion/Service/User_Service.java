package DeBug.emotion.Service;


import DeBug.emotion.Repository.DB_User_Repository;
import DeBug.emotion.domain.User;

import java.util.List;

public class User_Service {

    public User_Service(DB_User_Repository UserRepository) {
        this.UserRepository = UserRepository;
    }

    private final DB_User_Repository UserRepository;


    public List<User> find_User(){
        return UserRepository.find_User();
    }

    public String insert_User(User user){
        return UserRepository.insert_User(user);
    }
}
