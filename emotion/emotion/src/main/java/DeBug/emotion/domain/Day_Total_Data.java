package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Day_Total_Data")
@Getter
@Setter
@NoArgsConstructor
public class Day_Total_Data {
    @Id
    private String Year;
    private Integer[] All_Emotion3;
    private Integer[] All_Emotion7;
    private List<BroadCastData> BroadCastData;
}
