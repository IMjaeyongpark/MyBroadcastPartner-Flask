package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

//시청자 정보
@Document(collection = "Author")
@Getter
@Setter
@NoArgsConstructor
public class Author {

    @Id
    //시청자 이
    private String _id;
    private int[] All_Emotion3 = new int[3];
    private int[] All_Emotion7 = new int[3];

    @DBRef
    private BroadCast broadCast;
}
