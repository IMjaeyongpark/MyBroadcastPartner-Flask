package DeBug.emotion.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Day_Total_Data {

    @Id
    private String Day;
    private int[] All_Emotion3 = new int[3];
    private int[] All_Emotion7 = new int[7];
    private int[] One_Hour_Emotion = new int[24];
    @DBRef
    private Month_Total_Data month_total_data;
}
