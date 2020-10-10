package apap.tutorial.traveloke.service;

import apap.tutorial.traveloke.model.HotelModel;

import java.util.List;

public interface HotelService {
    // Method untuk menambah Hotel
    void addHotel(HotelModel hotel);

    // Method untuk mendapatkan daftar Hotel yang telah tersimpan
    List<HotelModel> getHotelList();

    // Method untuk mendapatkan data sebuah hotel berdasarkan id hotel
    HotelModel getHotelByIdHotel(String idHotel);

    //Latihan
    void updateNomorTelepon(HotelModel hotel, String nomorTelepon);

    void deleteHotel(HotelModel hotel);
}