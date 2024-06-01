package com.twd.pferna.service;

import java.util.List;
import com.twd.pferna.entity.OurUsers;

public interface OurUserService {
    List<OurUsers> getAllUsers();

    OurUsers createUser(OurUsers user);

    OurUsers getUserById(Integer id);

    OurUsers updateUser(OurUsers user);

    void deleteUser(OurUsers user);

	OurUsers getUserByEmail(String email);
}
