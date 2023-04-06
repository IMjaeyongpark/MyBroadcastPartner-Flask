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

    private String BCID;
    private String Name;
    private Date DateTime;
    private String Message;
    private String Emotion1;
    private String Emotion2;
}
