package DeBug.emotion.Service;


import DeBug.emotion.Repository.Repository;

public class Service {
    public Service(Repository repository) {
        this.repository = repository;
    }

    private final Repository repository;

    public String Check_ID(String id){
        return "200";
    }


}
