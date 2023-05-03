package DeBug.emotion.Service;


import DeBug.emotion.Repository.MongoDB_Repository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public MongoDB_Repository userRepository() {
        return new MongoDB_Repository();
    }

    @Bean
    public User_Service userService() {
        return new User_Service(userRepository());
    }

}
