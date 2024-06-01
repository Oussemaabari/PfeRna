package com.twd.pferna.service;

import com.twd.pferna.entity.Wishlist;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface WishlistService {
    Wishlist addToWishlist(Wishlist wishlist);
    void removeFromWishlist(Long id);
    List<Wishlist> getWishlistByUserId(Long userId);
    void clearWishlistByUserId(Integer userId);

}
