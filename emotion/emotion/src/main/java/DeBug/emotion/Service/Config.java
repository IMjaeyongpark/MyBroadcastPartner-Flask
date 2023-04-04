package DeBug.emotion.Service;


import DeBug.emotion.Repository.Repository;
import DeBug.emotion.Repository.Test_Repository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public Test_Repository testRepository(){
        return new Test_Repository();
    }

    @Bean
    public Service service(){
        return new Service(testRepository());
    }
}
