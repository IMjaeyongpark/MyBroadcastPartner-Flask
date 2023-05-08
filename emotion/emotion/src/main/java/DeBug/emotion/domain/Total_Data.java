package DeBug.emotion.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Total_Data {
    private List<Year_Total_Data> years = new ArrayList<Year_Total_Data>();
    private List<Month_Total_Data> months = new ArrayList<Month_Total_Data>();
    private List<Day_Total_Data> days = new ArrayList<Day_Total_Data>();
    private List<BroadCast> broadCasts = new ArrayList<BroadCast>();
}
