package DeBug.emotion.Repository;

import DeBug.emotion.domain.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Chat_Repository <S extends Chat> extends MongoRepository<S, String> {
}
