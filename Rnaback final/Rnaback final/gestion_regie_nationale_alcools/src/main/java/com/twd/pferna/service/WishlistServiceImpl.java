package com.twd.pferna.service;

import com.twd.pferna.entity.Wishlist;
import com.twd.pferna.repository.WishlistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public Wishlist addToWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    @Override
    public void removeFromWishlist(Long id) {
        wishlistRepository.deleteById(id);
    }

    @Override
    public List<Wishlist> getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }
    
    public void clearWishlistByUserId(Integer userId) {
        wishlistRepository.deleteByUserId(userId);
    }
}
