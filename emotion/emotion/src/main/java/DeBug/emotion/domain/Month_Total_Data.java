package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


//월별 정보
@Document(collection = "Month_Total_Data")
@Getter
@Setter
@NoArgsConstructor
public class Month_Total_Data {
    @Id
    private String Month;
    private Integer[] All_Emotion3;
    private Integer[] All_Emotion7;

    private List<Day_Total_Data> Day_Total_Data;
}
