package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//방송 감정분석 정보
@Document(collection = "BroadCastData")
@Getter
@Setter
@NoArgsConstructor
public class BroadCastData {
    @Id
    private String BCID;
    private Integer[] All_Emotion3;
    private Integer[] All_Emotion7;
}
