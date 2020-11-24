package apap.tutorial.haidokter.service;

import apap.tutorial.haidokter.model.UserModel;
import apap.tutorial.haidokter.repository.UserDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDb userDB;

    @Override
    public UserModel addUser(UserModel user) {
        String pass = encrypt(user.getPassword());
        user.setPassword(pass);
        return userDB.save(user);
    }

    @Override
    public String encrypt(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        return hashedPassword;
    }

    @Override
    public UserModel findByUsername(String name) {
        return userDB.findByUsername(name);
    }

    @Override
    public void setNewPassword(UserModel user, String passwordBaru) {
        UserModel curUser = userDB.findByUsername(user.getUsername());
        curUser.setPassword(encrypt(passwordBaru));
        userDB.save(curUser);
    }

    @Override
    public boolean checkIfValidPassword(String password) {
        if(password.length()<8){
            return false;
        }
        String regex = "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    @Override
    public boolean checkIfValidOldPassword(UserModel user, String oldPassword) {
        BCryptPasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
        boolean same= passwordEncoder.matches(oldPassword, user.getPassword());
        if(same){
            return true;
        }
        return false;
    }
}
