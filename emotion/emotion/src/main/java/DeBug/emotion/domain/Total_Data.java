package DeBug.emotion.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Total_Data {

    private List<BroadCast> broadCasts = new ArrayList<BroadCast>();
    private List<YearTotalData> years = new ArrayList<YearTotalData>();
    private List<MonthTotalData> months = new ArrayList<MonthTotalData>();
    private List<Day_Total_Data> days = new ArrayList<Day_Total_Data>();
}
