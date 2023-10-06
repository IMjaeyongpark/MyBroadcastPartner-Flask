package DeBug.emotion.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import java.beans.ConstructorProperties;
import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "Purchase_History")
public class Purchase_History {
    @Id
    //apply_num
    private String _id;
    private String name;
    private String amount;
    private String merchant_uid;
    private LocalDateTime start_date = LocalDateTime.now();
    private LocalDateTime end_date;

    @DBRef
    private User user;


}
