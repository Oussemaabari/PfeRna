package com.twd.pferna.service;

import com.twd.pferna.entity.Stock;
import com.twd.pferna.repository.StockRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;

    public StockServiceImpl(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    public Stock addStock(Stock stock) {
        // Implement logic to add stock to the database
        return stockRepository.save(stock);
    }

	@Override
	public List<Stock> getAllStocks() {
		// TODO Auto-generated method stub
		return null;
	}
}
