package DeBug.emotion.Repository;

import DeBug.emotion.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional
public class MongoDB_Repository {

    @Autowired
    private User_Repository mongoDBUserRepository;

    @Autowired
    private BroadCast_Repository mongoDBBroadCastRepository;

    @Autowired
    private Author_Repositoy mongoDBAuthorRepository;

    @Autowired
    private Year_Repositoy mongoDBYearRepositoy;


    //회원정보가 없으면 db저장
    public User insert_User(User user) {


        User u = mongoDBUserRepository.findOneBy_id(user.get_id());
        //없으면 저장
        if (u == null) {
            mongoDBUserRepository.insert(user);
            return user;
        }
        return u;
    }

    //유저의 방송 정보 저장
    public String save_BroadCast(BroadCast BC) {
        //방송정보 저장
        try {
            mongoDBBroadCastRepository.save(BC);
            return "200";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "400";
        }
    }

    //채팅 저장
    public String chat(User user, Chat chat, String BCID, String author_name) {

        //날짜 년,월,일 자르기
        String[] date = chat.getDateTime().split("-| ");

        //유저 정보로 년 정보 찾기
        List<YearTotalData> yearList = mongoDBYearRepositoy.findByUser(user);
        YearTotalData yearTotalData = new YearTotalData();
        yearTotalData.set_id(date[0]);

        for (int i = 0; i < yearList.size(); i++) {
            if (yearList.get(i).get_id().equals(date[0])) {
                yearTotalData = yearList.get(i);
                yearTotalData.setUser(user);
                break;
            }
        }

        yearTotalData.All_Emotion3[chat.getEmotion3()]++;
        yearTotalData.All_Emotion7[chat.getEmotion7()]++;
        int month = Integer.parseInt(date[1]) - 1;
        int day = Integer.parseInt(date[2]) - 1;
        if (yearTotalData.monthTotalData[month] == null) {
            yearTotalData.monthTotalData[month] = new MonthTotalData();
        }
        yearTotalData.monthTotalData[month].getAll_Emotion3()[chat.getEmotion3()]++;
        yearTotalData.monthTotalData[month].getAll_Emotion7()[chat.getEmotion7()]++;
        if (yearTotalData.monthTotalData[month].getDay_total_data()[day] == null) {
            yearTotalData.monthTotalData[month].getDay_total_data()[day] = new DayTotalData();
        }
        yearTotalData.monthTotalData[month].getDay_total_data()[day].getAll_Emotion3()[chat.getEmotion3()]++;
        yearTotalData.monthTotalData[month].getDay_total_data()[day].getAll_Emotion7()[chat.getEmotion7()]++;

        mongoDBYearRepositoy.save(yearTotalData);

        //방송 정보 저장
        BroadCast BC = mongoDBBroadCastRepository.findById(BCID).get();
        BC.All_Emotion3[chat.getEmotion3()]++;
        BC.All_Emotion7[chat.getEmotion7()]++;
        mongoDBBroadCastRepository.save(BC);


        //방송 정보로 시청자 정보 가져오기
        BroadCast sampleBC = new BroadCast();
        sampleBC.set_id(BCID);
        List<Author> authorList = mongoDBAuthorRepository.findByBroadCast(sampleBC);

        //시청자 채팅 저장
        for (Author author : authorList) {
            if (author.getName().equals(author_name)) {
                return save_chat(author, chat);
            }
        }

        Author author = new Author();
        author.setBroadCast(sampleBC);
        author.setName(author_name);
        return save_chat(author, chat);
    }

    public Total_Data mypageData(User user) {
        //사용자의 정보들을 담을 객체
        Total_Data td = new Total_Data();
        List<BroadCast> bc = mongoDBBroadCastRepository.findByUser(user);
        List<YearTotalData> year = mongoDBYearRepositoy.findByUser(user);
        td.setBroadCasts(bc);
        td.setYears(year);
        return td;
    }

    //정보 저장
    private String save_chat(Author author, Chat chat) {
        author.chat.add(chat);
        author.All_Emotion3[chat.getEmotion3()]++;
        author.All_Emotion7[chat.getEmotion7()]++;
        try {
            mongoDBAuthorRepository.save(author);
            return "200";
        } catch (Exception e) {
            System.out.println("채팅 저장 실패");
            return "400";
        }
    }


    //시청자 정보 저장
//    private Author find_AuthorByname(String name){
//        Author sampleAuthor = new Author();
//        sampleAuthor.setName(name);
//        Example<Author> example = Example.of(sampleAuthor);
//        Optional<Author> a  = mongoDBAuthorRepository.findOne(example);
//        try {
//            if (a.isEmpty()) {
//                return null;
//            }
//            return a.get();
//        }catch(Exception e){
//            return null;
//        }
//    }
}
