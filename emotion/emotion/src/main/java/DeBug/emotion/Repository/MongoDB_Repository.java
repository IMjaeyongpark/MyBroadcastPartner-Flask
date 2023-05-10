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
    @Autowired
    private Month_Repositoy mongoDBMonthRepositoy;
    @Autowired
    private Day_Repositoy mongoDBDayRepositoy;


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
    public String chat(User user,Chat chat, String BCID, String author_name) {

        YearTotalData year_total = new YearTotalData();

        year_total.setYear("2023");
        year_total.All_Emotion3[chat.getEmotion3()]++;
        year_total.All_Emotion7[chat.getEmotion7()]++;
        year_total.setUser(user);

        MonthTotalData month_total = new MonthTotalData();
        month_total.setMonth("3");
        month_total.All_Emotion3[chat.getEmotion3()]++;
        month_total.All_Emotion7[chat.getEmotion7()]++;
        month_total.setYearTotalData(year_total);

        Day_Total_Data day_total = new Day_Total_Data();
        day_total.setDay("25");
        day_total.All_Emotion3[chat.getEmotion3()]++;
        day_total.All_Emotion7[chat.getEmotion7()]++;
        day_total.setMonthTotalData(month_total);


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
