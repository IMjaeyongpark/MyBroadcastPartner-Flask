package DeBug.emotion.Repository;

import DeBug.emotion.domain.Author;
import DeBug.emotion.domain.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface Chat_Repository extends MongoRepository<Chat,String> {
    List<Chat> findByAuthor(Author author);
}
