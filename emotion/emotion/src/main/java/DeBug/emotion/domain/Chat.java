package DeBug.emotion.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Chat")
@Getter
@Setter
@NoArgsConstructor
public class Chat {

    @Id
    private String id;
    private String DateTime;
    private String Message;
    private String Emotion3;
    private String Emotion7;
}
