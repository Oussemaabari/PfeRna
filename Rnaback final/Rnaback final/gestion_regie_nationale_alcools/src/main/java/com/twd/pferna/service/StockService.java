package com.twd.pferna.service;

import com.twd.pferna.entity.Stock;

import java.util.List;

public interface StockService {
	
	
    Stock addStock(Stock stock);

    List<Stock> getAllStocks();
}
