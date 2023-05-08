package DeBug.emotion.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Month_Total_Data")
@Getter
@Setter
@NoArgsConstructor
public class Month_Total_Data {
    @Id
    private String Month;
    private int[] All_Emotion3 = new int[3];
    private int[] All_Emotion7 = new int[7];
    @DBRef
    private Year_Total_Data year_Total_Data;
}
