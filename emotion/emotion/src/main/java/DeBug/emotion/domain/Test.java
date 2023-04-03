package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Test")
@Getter
@Setter
@NoArgsConstructor
public class Test {
    @Id
    private String Id;
    private String name;
    private int age;
}
