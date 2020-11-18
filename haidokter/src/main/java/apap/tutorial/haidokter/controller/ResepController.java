package apap.tutorial.haidokter.controller;

import apap.tutorial.haidokter.model.ObatModel;
import apap.tutorial.haidokter.model.ResepModel;
import apap.tutorial.haidokter.service.ResepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ResepController {
    @Qualifier("resepServiceImpl")
    @Autowired
    private ResepService resepService;

    @GetMapping("/resep/add")
    public String addResepFormPage(Model model) {
        model.addAttribute("resep", new ResepModel());

        return "form-add-resep";
    }

    @PostMapping("/resep/add")
    public String addResepSubmit(
            @ModelAttribute ResepModel resep,
            Model model
    ) {
        resepService.addResep(resep);
        model.addAttribute("nomorResep", resep.getNoResep());

        return "add-resep";
    }

    @GetMapping({"/resep/change/{noResep}", "/resep/change"})
    private String changeResepFormPage(
            @PathVariable(required = false) Long noResep,
            Model model
    ) {
        if (noResep != null && isResepExists(noResep)) {
            ResepModel resep = resepService.getResepByNomorResep(noResep).get();
            model.addAttribute("resep", resep);

            return "form-update-resep";
        }
        model.addAttribute("msg", "Nomor Resep Tidak Ditemukan atau Nomor Resep Tidak Ada!");

        return "error";
    }

    @PostMapping("/resep/change")
    private String changeResepFormSubmit(
            @ModelAttribute ResepModel resep,
            Model model
    ) {
        ResepModel updatedResep = resepService.updateResep(resep);
        model.addAttribute("resep", updatedResep);

        return "update-resep";
    }

    @GetMapping("/resep/view")
    public String viewDetailResep(
            @RequestParam(value = "noResep") Long noResep,
            Model model
    ) {
        if (noResep != null && isResepExists(noResep)) {
            ResepModel resep = resepService.getResepByNomorResep(noResep).get();
            List<ObatModel> listObat = resep.getListObat();

            model.addAttribute("resep", resep);
            model.addAttribute("title", "Daftar Obat:");

            if (listObat.size() > 0) model.addAttribute("listObat", listObat);
            else model.addAttribute("title", "Resep belum memiliki daftar obat");

            return "view-resep";
        }
        model.addAttribute("msg", "Nomor Resep Tidak Ditemukan atau Nomor Resep Tidak Ada!");

        return "errors";
    }

    @GetMapping("/resep/viewall")
    public String listResep(Model model) {
        List<ResepModel> listResep = resepService.getResepList();
        model.addAttribute("listResep", listResep);

        return "viewall-resep";
    }

    @GetMapping({"/resep/delete/no-resep/{noResep}", "/resep/delete/no-resep"})
    public String deleteResep(
            @PathVariable(value = "noResep", required = false) Long noResep,
            Model model
    ) {
        if (noResep != null) {
            if (isResepExists(noResep) && !hasObat(noResep)) {
                ResepModel resep = resepService.getResepByNomorResep(noResep).get();
                model.addAttribute("resep", resep);
                resepService.deleteResep(noResep);

                return "delete-resep";
            } else if (hasObat(noResep)) {
                model.addAttribute("msg", "Resep masih memiliki obat! Hapus obat terlebih dahulu!");

                return "errors";
            }
        }
        model.addAttribute("msg", "Nomor Resep Tidak Ditemukan atau Nomor Resep Tidak Ada!");

        return "errors";
    }

    private boolean isResepExists(Long noResep) {
        return resepService.getResepByNomorResep(noResep).isPresent();
    }

    private boolean hasObat(Long noResep) {
        return resepService.getResepByNomorResep(noResep).get().getListObat().size() != 0;
    }
}

