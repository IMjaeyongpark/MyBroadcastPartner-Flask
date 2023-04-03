package DeBug.emotion.Repository;

import DeBug.emotion.domain.Test;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface Repository extends MongoRepository<Test, String> {


}
