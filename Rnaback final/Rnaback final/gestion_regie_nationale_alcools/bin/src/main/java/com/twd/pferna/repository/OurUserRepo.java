package com.twd.pferna.repository;

import com.twd.pferna.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OurUserRepo extends JpaRepository<OurUsers, Integer> {
	Optional<OurUsers> findByEmail(String email);
}
