package DeBug.emotion.Repository;

import DeBug.emotion.domain.Month_Total_Data;
import DeBug.emotion.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Month_Repositoy extends MongoRepository<Month_Total_Data, String> {
}
