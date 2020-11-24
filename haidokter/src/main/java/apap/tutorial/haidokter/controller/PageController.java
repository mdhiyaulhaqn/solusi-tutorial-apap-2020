package apap.tutorial.haidokter.controller;

import apap.tutorial.haidokter.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
    @Autowired
    RoleService roleService;

    @RequestMapping("/")
    public String home(Model model, Authentication authentication) {
        model.addAttribute("listRole", roleService.findAll());
        model.addAttribute("is_admin",  authentication.getAuthorities().toString().contains("ADMIN"));
        return "home";
    }

    @RequestMapping("/login")
    public String login(){
        return "login";
    }
}




