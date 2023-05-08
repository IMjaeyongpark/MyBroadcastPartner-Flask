package DeBug.emotion.Repository;

import DeBug.emotion.domain.User;
import DeBug.emotion.domain.Year_Total_Data;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Year_Repositoy extends MongoRepository<Year_Total_Data, String> {
}
