package apap.tutorial.haidokter.controller;

import apap.tutorial.haidokter.model.UserModel;
import apap.tutorial.haidokter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    private String addUserSubmit(@ModelAttribute UserModel user) {
            userService.addUser(user);
            return "redirect:/";
    }

    @GetMapping(value = "/update-password")
    public String updateUser(){
        return "form-update-password";
    }

    @RequestMapping(value = "/update-password", method = RequestMethod.POST)
    public String changePassword(
            @RequestParam("passwordLama") String passwordLama,
            @RequestParam("passwordBaru") String passwordBaru,
            @RequestParam("konfirmasi") String konfirmasi,
            Authentication auth,
            RedirectAttributes redirect
    ) {
            String name = auth.getName();
            UserModel user = userService.findByUsername(name);
            boolean samePassword = userService.checkIfValidOldPassword(user, passwordLama);
            if (!samePassword) {
                redirect.addFlashAttribute("notif", "Invalid Credentials");
                return "redirect:/user/update-password";
            }
            if (!passwordBaru.equals(konfirmasi)) {
                redirect.addFlashAttribute("notif", "Password tidak sama");
                return "redirect:/user/update-password";
            }
            userService.setNewPassword(user, passwordBaru);
            redirect.addFlashAttribute("notif", "Password berhasil dirubah");
            return "redirect:/";
        }
}

