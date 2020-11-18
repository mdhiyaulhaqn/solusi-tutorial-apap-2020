package apap.tutorial.haidokter.service;

import apap.tutorial.haidokter.model.ObatModel;

import java.util.List;

public interface ObatRestService {
    ObatModel createObat(ObatModel obat);

    List<ObatModel> retriveListObat();

    ObatModel getObatByIdObat(Long idObat);

    ObatModel changeObat(Long idObat, ObatModel obatUpdate);

    void deleteObat(Long idObat);
}
