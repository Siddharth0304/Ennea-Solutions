package com.example.products.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double rating;
    @Column(columnDefinition = "TEXT")
    private String comment;
    private String reviewerName;
    private String reviewerEmail;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore //JsonIgnore is used to ignore the logical property used in serialization and deserialization.
    private Product product;
}
