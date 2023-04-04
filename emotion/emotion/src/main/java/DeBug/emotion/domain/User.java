package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    private String Email;

    private String Name;

    private String Channel_Name;

    private int age;
}
