package DeBug.emotion.Repository;

import DeBug.emotion.domain.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface Chat_Repository <S extends Chat> extends MongoRepository<S, String> {
    List<Chat> findByBCID(String BCID);
}
