package com.fatec.service;

import com.fatec.dto.UserDTO;
import com.fatec.model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findOne(String username);

    User findById(Long id);

    User save(User user);

    void delete(Long id);

    User save(UserDTO userDTO);
}
