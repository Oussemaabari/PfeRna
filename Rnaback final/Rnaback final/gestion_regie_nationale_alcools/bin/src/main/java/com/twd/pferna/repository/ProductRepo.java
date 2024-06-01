package com.twd.pferna.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twd.pferna.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {
}
