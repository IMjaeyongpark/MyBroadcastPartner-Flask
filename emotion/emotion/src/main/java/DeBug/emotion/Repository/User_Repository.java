package DeBug.emotion.Repository;

import DeBug.emotion.domain.Test;
import DeBug.emotion.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface User_Repository extends MongoRepository<User, String> {
}
