package DeBug.emotion.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BroadCastData")
@Getter
@Setter
@NoArgsConstructor
public class BroadCastData {

    @Id
    private String BCID;
    private String email;
    private String Title;
    private String ThumbnailsUrl;
    private String ActualStartTime;
    private String ActualEndTime;
    private int HighViewer;
    private int LowViewer;

}
