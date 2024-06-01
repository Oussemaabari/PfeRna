package com.twd.pferna.dto;

public class WishlistResponseDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Integer userId;
    private String userName;
    private int quantity;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer integer) {
		this.userId = integer;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

    // Getters and setters
    
    
}
