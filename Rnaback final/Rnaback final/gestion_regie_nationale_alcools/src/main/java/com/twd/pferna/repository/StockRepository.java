package com.twd.pferna.repository;

import com.twd.pferna.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    // You can add custom query methods here if needed
}
