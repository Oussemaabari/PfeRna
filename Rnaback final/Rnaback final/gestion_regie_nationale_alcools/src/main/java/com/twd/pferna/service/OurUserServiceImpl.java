package com.twd.pferna.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.twd.pferna.entity.OurUsers;
import com.twd.pferna.repository.OurUserRepo;

@Service
public class OurUserServiceImpl implements OurUserService {

    private final OurUserRepo ourUserRepo;

    @Autowired
    public OurUserServiceImpl(OurUserRepo ourUserRepo) {
        this.ourUserRepo = ourUserRepo;
    }

    @Override
    public List<OurUsers> getAllUsers() {
        return ourUserRepo.findAll();
    }

    @Override
    public OurUsers createUser(OurUsers user) {
        return ourUserRepo.save(user);
    }

    @Override
    public OurUsers getUserById(Integer id) {
        return ourUserRepo.findById(id).orElse(null);
    }

    @Override
    public OurUsers updateUser(OurUsers user) {
        return ourUserRepo.save(user);
    }

    @Override
    public void deleteUser(OurUsers user) {
        ourUserRepo.delete(user);
    }

    // Add method to find user by email
    @Override
    public OurUsers getUserByEmail(String email) {
        return ourUserRepo.findByEmail(email).orElse(null);
    }
}
