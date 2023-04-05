package DeBug.emotion.Service;


import DeBug.emotion.Repository.Chat_Repository;
import DeBug.emotion.Repository.DB_BC_Repository;
import DeBug.emotion.Repository.DB_Chat_Repository;
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

    @Bean
    public DB_Chat_Repository chatRepository(){
        return new DB_Chat_Repository();
    }

    @Bean
    public Chat_Service chatservice(){
        return new Chat_Service(chatRepository());
    }
    @Bean
    public DB_BC_Repository BCRepository(){
        return new DB_BC_Repository();
    }

    @Bean
    public BroadCastData_Service BC_service(){
        return new BroadCastData_Service(BCRepository());
    }



}
