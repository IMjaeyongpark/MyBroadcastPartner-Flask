package DeBug.emotion.Repository;

import DeBug.emotion.domain.Test;
import DeBug.emotion.domain.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class Test_Repository {

    @Autowired
    Repository mongoDBTestRepository;

    @Autowired
    User_Repository mongoDBUserRepository;

    public String insert_test(Test test){
        mongoDBTestRepository.insert(test);
        return "200";
    }

    public List<Test> find_test(){
        return mongoDBTestRepository.findAll();
    }

    public List<User> find_User(){
        return mongoDBUserRepository.findAll();
    }

    public String insert_User(User user){
        mongoDBUserRepository.insert(user);
        return "200";
    }


}
