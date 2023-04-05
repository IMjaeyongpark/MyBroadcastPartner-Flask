package DeBug.emotion.Service;

import DeBug.emotion.Repository.DB_BC_Repository;

public class BroadCastData_Service {
    private final DB_BC_Repository BCDRepository;

    public BroadCastData_Service(DB_BC_Repository BCDRepository) {
        this.BCDRepository = BCDRepository;
    }
}
