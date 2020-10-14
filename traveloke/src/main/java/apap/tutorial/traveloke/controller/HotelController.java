package apap.tutorial.traveloke.controller;

import apap.tutorial.traveloke.model.HotelModel;
import apap.tutorial.traveloke.model.KamarModel;
import apap.tutorial.traveloke.service.HotelService;
import apap.tutorial.traveloke.service.KamarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class HotelController {
    @Qualifier("hotelServiceImpl")
    @Autowired
    private HotelService hotelService;

    @Autowired
    private KamarService kamarService;

    @GetMapping("/")
    private String home(){
        return "home";
    }

    @GetMapping("/hotel/add")
    public String addHotelFormPage(Model model){
        model.addAttribute("hotel", new HotelModel());
        return "form-add-hotel";
    }
    
    @PostMapping("/hotel/add")
    public String addHotelSubmit(
            @ModelAttribute HotelModel hotel,
            Model model){
        hotelService.addHotel(hotel);
        model.addAttribute("idHotel", hotel.getId());
        return "add-hotel";
    }

    @GetMapping("/hotel/change/{idHotel}")
    public String changeHotelFormPage(
            @PathVariable Long idHotel,
            Model model
    ){
        HotelModel hotel = hotelService.getHotelByIdHotel(idHotel);
        model.addAttribute("hotel", hotel);
        return "form-update-hotel";
    }

    @PostMapping("/hotel/change")
    public String changeHotelFormSubmit(
            @ModelAttribute HotelModel hotel,
            Model model
    ){
        HotelModel hotelUpdated = hotelService.updateHotel(hotel);
        model.addAttribute("hotel", hotel);
        return "update-hotel";
    }

    @GetMapping("/hotel/view")
    public String viewDetailHotel(
            @RequestParam(value = "idHotel") Long idHotel,
            Model model
    ){
        System.out.println("id hotel : " + idHotel);
        HotelModel hotel = hotelService.getHotelByIdHotel(idHotel);
        List<KamarModel> listKamar = kamarService.findAllKamarByIdHotel(idHotel);
        boolean hasKamar = listKamar.size() > 0;
        model.addAttribute("hasKamar", hasKamar);
        model.addAttribute("hotel", hotel);
        model.addAttribute("listKamar", listKamar);
        return "view-hotel";
    }

    @RequestMapping("/hotel/viewall")
    public String listHotel(Model model){

        // Mendapatkan semua HotelModel
        List<HotelModel> listHotel = hotelService.getHotelList();

        // Add variabel semua HotelModel ke 'listHotel' untuk dirender pada thymeleaf
        model.addAttribute( "listHotel", listHotel);

        // Return view template yang diinginkan
        return "viewall-hotel";
    }

    @RequestMapping("/hotel/view-all")
    public String listHotelDesc(Model model){

        // Mendapatkan semua HotelModel
        List<HotelModel> listHotel = hotelService.getHotelListOrderByIdDesc();

        // Add variabel semua HotelModel ke 'listHotel' untuk dirender pada thymeleaf
        model.addAttribute( "listHotel", listHotel);

        // Return view template yang diinginkan
        return "viewall-hotel";
    }

    @GetMapping(path = "/hotel/delete/{idHotel}")
    public String deleteWithPathVariable(
            @PathVariable(value = "idHotel", required = true) Long idHotel,
            Model model
    ){
        HotelModel hotel = hotelService.getHotelByIdHotel(idHotel);
        List<KamarModel> listKamar = kamarService.findAllKamarByIdHotel(idHotel);
        model.addAttribute("hotel", hotel);

        if(listKamar.size() == 0){
            return "error-delete-hotel";
        }
        else{
            hotelService.deleteHotel(hotel);
            return "delete-hotel";
        }
    }

//    // Routing URL yang diinginkan
//    @RequestMapping("/hotel/add")
//    public String addHotel(
//            // Request parameter yang ingin dibawa
//            @RequestParam(value= "idHotel", required = true) String idHotel,
//            @RequestParam(value= "namaHotel", required = true) String namaHotel,
//            @RequestParam(value= "alamat", required = true) String alamat,
//            @RequestParam(value= "noTelepon", required = true) String noTelepon,
//            Model model
//    ){
//
//        // Membuat objek HotelModel
//        HotelModel hotel = new HotelModel(idHotel, namaHotel, alamat, noTelepon);
//
//        // Memanggil service addHotel
//        hotelService.addHotel(hotel);
//
//        // Add variabel id hotel ke 'idHotel' untuk dirender pada thymeleaf
//        model.addAttribute("idHotel", idHotel);
//
//        // Return view template yang digunakan
//        return "add-hotel";
//    }

//    @RequestMapping("/hotel/view")
//    public String detailHotel(
//            @RequestParam(value= "idHotel") Long idHotel,
//            Model model) {
//
//        // Mendapatkan HotelModel sesuai dengan idHotel
//        HotelModel hotel = hotelService.getHotelByIdHotel(idHotel);
//
//        // Add variabel HotelModel ke 'hotel' untuk dirender pada thymeleaf
//        model.addAttribute("hotel", hotel);
//
//        return "view-hotel";
//    }
}
