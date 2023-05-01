package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Author")
@Getter
@Setter
@NoArgsConstructor
public class Author {

    @Id
    private  String Name;
    private Integer[] All_Emotion3;
    private Integer[] All_Emotion7;
    private List<Chat> Chat;
}
