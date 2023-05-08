package DeBug.emotion.Repository;

import DeBug.emotion.domain.Day_Total_Data;
import DeBug.emotion.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Day_Repositoy extends MongoRepository<Day_Total_Data, String> {
}
