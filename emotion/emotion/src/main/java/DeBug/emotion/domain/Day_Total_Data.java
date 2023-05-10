package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Day_Total_Data")
@Getter
@Setter
@NoArgsConstructor
public class Day_Total_Data {

    @Id
    private String Day;
    public int[] All_Emotion3 = new int[3];
    public int[] All_Emotion7 = new int[7];
    private int[] One_Hour_Emotion = new int[24];
    @DBRef
    private MonthTotalData monthTotalData;
    @DBRef
    private YearTotalData yearTotalData;
}
