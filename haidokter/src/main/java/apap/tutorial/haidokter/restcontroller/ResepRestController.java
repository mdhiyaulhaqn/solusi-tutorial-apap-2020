package apap.tutorial.haidokter.restcontroller;

import apap.tutorial.haidokter.model.ResepModel;
import apap.tutorial.haidokter.rest.ResepDetail;
import apap.tutorial.haidokter.service.ResepRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class ResepRestController {
    @Autowired
    private ResepRestService resepRestService;

    @PostMapping(value = "resep")
    private ResepModel createResep(@Valid @RequestBody ResepModel resep, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field");
        } else {
            return resepRestService.createResep(resep);
        }
    }

    @DeleteMapping(value = "/resep/{noResep}")
    private ResponseEntity<String> deleteResep(@PathVariable("noResep") Long noResep) {
        try {
            resepRestService.deleteResep(noResep);
            return ResponseEntity.ok("Resep with Number " + String.valueOf(noResep) + " deleted!");
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Resep with Number " + String.valueOf(noResep) + " not found!");
        } catch (UnsupportedOperationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Resep still has Obat, please delete the Obat first!");
        }
    }

    @PutMapping(value = "resep/{noResep}")
    private ResepModel updateResep(@PathVariable(value = "noResep") Long noResep, @RequestBody ResepModel resep) {
        try {
            return resepRestService.changeResep(noResep, resep);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Resep with Number " + String.valueOf(noResep) + " not found!");
        }
    }

    @GetMapping(value = "/reseps")
    private List<ResepModel> retrieveListResep() {
        return resepRestService.retrieveListResep();
    }

    @GetMapping(value = "/resep/{noResep}/status")
    private Mono<String> getStatus(@PathVariable Long noResep) {
        return resepRestService.getStatus(noResep);
    }

    @GetMapping(value = "/full")
    private Mono<ResepDetail> postStatus() {
        return resepRestService.postStatus();
    }
}
