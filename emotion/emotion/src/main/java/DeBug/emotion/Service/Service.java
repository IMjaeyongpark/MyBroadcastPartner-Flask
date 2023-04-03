package DeBug.emotion.Service;


import DeBug.emotion.Repository.Repository;
import DeBug.emotion.domain.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class Service {

    @Autowired
    Repository mongoDBTestRepository;



    public List<Test> find_test(){
        return mongoDBTestRepository.findAll();
    }

    public String insert_test(Test test){
        mongoDBTestRepository.insert(test);
        return "200";
    }
}
