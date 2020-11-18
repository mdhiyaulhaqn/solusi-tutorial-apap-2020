package apap.tutorial.haidokter.service;

import apap.tutorial.haidokter.model.ObatModel;
import apap.tutorial.haidokter.model.ResepModel;
import apap.tutorial.haidokter.repository.ObatDb;
import apap.tutorial.haidokter.rest.Setting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ObatRestServiceImpl implements ObatRestService {
    @Autowired
    private ObatDb obatDb;

    @Override
    public ObatModel createObat(ObatModel obat) {
        return obatDb.save(obat);
    }

    @Override
    public List<ObatModel> retriveListObat() {
        return obatDb.findAll();
    }

    @Override
    public ObatModel getObatByIdObat(Long idObat) {
        ObatModel obat = obatDb.findObatModelById(idObat);
        if (obat != null) {
            return obat;
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public ObatModel changeObat(Long idObat, ObatModel obatUpdate) {
        ObatModel obat = getObatByIdObat(idObat);
        obat.setNama(obatUpdate.getNama());
        obat.setBentuk(obatUpdate.getBentuk());
        obat.setKuantitas(obatUpdate.getKuantitas());
        return obatDb.save(obat);
    }

    @Override
    public void deleteObat(Long idObat) {
        ObatModel obat = getObatByIdObat(idObat);
        obatDb.delete(obat);
    }
}
