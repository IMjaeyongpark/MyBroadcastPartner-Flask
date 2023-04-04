package DeBug.emotion.Service;


import DeBug.emotion.Repository.Repository;
import DeBug.emotion.Repository.Test_Repository;
import DeBug.emotion.domain.Test;
import DeBug.emotion.domain.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class Service {

    public Service(Test_Repository testRepository) {
        this.testRepository = testRepository;
    }

    private final Test_Repository testRepository;


    public List<Test> find_test(){
        return testRepository.find_test();
    }

    public String insert_test(Test test){
        return testRepository.insert_test(test);
    }

    public List<User> find_User(){
        return testRepository.find_User();
    }

    public String insert_User(User user){
        return testRepository.insert_User(user);
    }
}
