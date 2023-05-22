package DeBug.emotion.Service;


import DeBug.emotion.Repository.MongoDB_Repository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
public class Config implements WebSocketMessageBrokerConfigurer {


    @Bean
    public MongoDB_Repository userRepository() {
        return new MongoDB_Repository();
    }

    @Bean
    public Service userService() {
        return new Service(userRepository());
    }



    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket").setAllowedOrigins("*").withSockJS();
    }
}
