package apap.tutorial.traveloke.repository;

import apap.tutorial.traveloke.model.KamarModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KamarDb extends JpaRepository<KamarModel,Long> {
    KamarModel findByNoKamar(Long noKamar);
    List<KamarModel> findAllByHotelId(Long hotelId);
}


