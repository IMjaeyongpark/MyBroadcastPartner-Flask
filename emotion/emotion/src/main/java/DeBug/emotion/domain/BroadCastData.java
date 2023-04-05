package DeBug.emotion.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "BroadCastData")
@Getter
@Setter
@NoArgsConstructor
public class BroadCastData {
    private String Email;
    @Id
    private String BCID;
    private String Title;
    private String ActualStartTime;
    private Date ThumbnailsUrl;
    private Date ActualEndTime;
    private int HighViewer;
    private int LowViewer;

}
