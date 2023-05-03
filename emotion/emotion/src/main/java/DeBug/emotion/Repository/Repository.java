package DeBug.emotion.Repository;

import DeBug.emotion.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

//몽고디비 연결
public interface Repository<S extends User> extends MongoRepository<S, String> {
}
