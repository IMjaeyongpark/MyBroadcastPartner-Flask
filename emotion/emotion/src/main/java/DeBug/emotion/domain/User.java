package DeBug.emotion.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import java.util.List;

//유저 정보
@Document(collection = "Users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @Email
    private String Email;

    private String Name;

    private String Channel_Name;

    private String Locale;

    private String Picture;

    private List<BroadCast> BroadCast;
    private List<Year_Total_Data> Year_Total_Data;
}
