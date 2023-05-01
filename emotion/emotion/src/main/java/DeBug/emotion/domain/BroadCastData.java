package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


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
