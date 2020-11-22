package apap.tutorial.traveloke.controller;

import apap.tutorial.traveloke.model.UserModel;
import apap.tutorial.traveloke.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public String addUserSubmit(@ModelAttribute UserModel user, Model model){
        userService.addUser(user);
        model.addAttribute("user", user);
        return "redirect:/";
    }

    @GetMapping(value = "/update-password")
    public String updateUser(){
        return "form-update-password";
    }

    @RequestMapping(value = "/update-password", method = RequestMethod.POST)
    public String changePassword(
            @ModelAttribute UserModel user,
            @RequestParam("passwordLama") String passwordLama,
            @RequestParam("passwordBaru") String passwordBaru,
            @RequestParam("konfirmasi") String konfirmasi,
            Model model,
            Authentication auth)
    {

        UserModel currentUser = userService.findByUsername(auth.getName());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Boolean isValid = passwordEncoder.matches(passwordLama, currentUser.getPassword());

        if(isValid){
            if(passwordBaru.equals(konfirmasi)){
                userService.setNewPassword(currentUser, passwordBaru);
                model.addAttribute("isSuccess", true);
            }
            else{
                model.addAttribute("notSameBaru", true);
            }
        }
        else{
            model.addAttribute("notSameLama", true);
        }
        return "form-update-password";
    }
}


