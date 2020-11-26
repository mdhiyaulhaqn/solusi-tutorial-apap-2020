package apap.tutorial.traveloke.service;

import apap.tutorial.traveloke.model.RoleModel;
import apap.tutorial.traveloke.repository.RoleDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleDb roleDb;

    public List<RoleModel> findAll(){
        return roleDb.findAll();
    }
}
