package DeBug.emotion.Service;


import DeBug.emotion.Repository.Repository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {



    @Bean
    public Service service(){
        return new Service();
    }
}
