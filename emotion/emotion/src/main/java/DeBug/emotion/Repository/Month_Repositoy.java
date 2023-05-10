package DeBug.emotion.Repository;

import DeBug.emotion.domain.MonthTotalData;
import DeBug.emotion.domain.YearTotalData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface Month_Repositoy extends MongoRepository<MonthTotalData, String> {
    List<MonthTotalData> findByYearTotalData(YearTotalData year_total_data);
}
