package DeBug.emotion.Repository;

import DeBug.emotion.domain.Test;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Repository extends MongoRepository<Test, String> {
}
