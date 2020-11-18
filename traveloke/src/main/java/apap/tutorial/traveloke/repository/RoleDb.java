package apap.tutorial.traveloke.repository;

import apap.tutorial.traveloke.model.RoleModel;
import apap.tutorial.traveloke.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleDb  extends JpaRepository<RoleModel, Long> {
    List<RoleModel> findAll();
}
