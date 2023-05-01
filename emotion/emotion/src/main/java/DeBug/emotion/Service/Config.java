package DeBug.emotion.Service;


import DeBug.emotion.Repository.DB_User_Repository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public DB_User_Repository userRepository(){
        return new DB_User_Repository();
    }

    @Bean
    public User_Service userService(){
        return new User_Service(userRepository());
    }

}
