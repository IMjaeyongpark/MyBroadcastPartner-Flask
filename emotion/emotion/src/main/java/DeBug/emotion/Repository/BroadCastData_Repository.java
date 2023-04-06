package DeBug.emotion.Repository;

import DeBug.emotion.domain.BroadCastData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BroadCastData_Repository <S extends BroadCastData> extends MongoRepository<S, String> {
}
