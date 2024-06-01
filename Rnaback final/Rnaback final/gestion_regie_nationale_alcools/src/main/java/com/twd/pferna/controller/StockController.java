package com.twd.pferna.controller;

import com.twd.pferna.entity.Stock;
import com.twd.pferna.service.StockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @PostMapping("/add")
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        Stock addedStock = stockService.addStock(stock);
        return new ResponseEntity<>(addedStock, HttpStatus.CREATED);
    }
}
