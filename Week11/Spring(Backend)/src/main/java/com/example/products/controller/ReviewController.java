package com.example.products.controller;

import com.example.products.model.Review;
import com.example.products.service.ReviewService;
import org.springframework.web.bind.annotation.*;

//The crossorigin attribute sets the mode of the request to an HTTP CORS Request
@CrossOrigin
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    //Add a new review
    @PostMapping("/add/{productId}")
    public void addReview(@PathVariable Long productId,@RequestBody Review review){
        reviewService.addReview(productId,review);
    }


}
