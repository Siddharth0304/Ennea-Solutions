package com.example.products.repository;

import com.example.products.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//repository is used to manage data persistence and retrieval in a database

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
}
