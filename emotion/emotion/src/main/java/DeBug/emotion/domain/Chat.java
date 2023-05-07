package DeBug.emotion.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


//채팅 정보
@Document(collection = "Chat")
@Getter
@Setter
@NoArgsConstructor
public class Chat {

    @Id
    private String id;
    private String DateTime;
    private String Message;
    private int Emotion3;
    private int Emotion7;
    @DBRef
    private Author author;
}
