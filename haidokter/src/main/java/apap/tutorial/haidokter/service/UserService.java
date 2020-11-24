package apap.tutorial.haidokter.service;

import apap.tutorial.haidokter.model.UserModel;

public interface UserService {
    UserModel addUser(UserModel user);
    String encrypt(String password);
    UserModel findByUsername(String username);
    void setNewPassword(UserModel user, String password);
    boolean checkIfValidPassword(String password);
    boolean checkIfValidOldPassword(UserModel user, String password);
}

