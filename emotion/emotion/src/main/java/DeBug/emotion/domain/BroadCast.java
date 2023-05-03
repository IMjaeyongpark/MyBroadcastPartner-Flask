package DeBug.emotion.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "BroadCast")
@Getter
@Setter
@NoArgsConstructor
public class BroadCast {

    @Id
    private String BCID;
    private String URI;
    private String Title;
    private String ThumbnailsUrl;
    private String ActualStartTime;
    private String ActualEndTime;
    private Integer HighViewer;
    private Integer LowViewer;

    private List<Author> Author;
}
