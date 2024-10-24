package com.example.products.service;

import com.example.products.model.Product;
import com.example.products.model.Review;
import com.example.products.repository.ProductRepository;
import com.example.products.repository.ReviewRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ReviewService{
    ReviewRepository reviewRepository;
    ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public void addReview(Long productId, Review review) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
        review.setProduct(product);
        product.getReviews().add(review);
        reviewRepository.save(review);
    }
}
