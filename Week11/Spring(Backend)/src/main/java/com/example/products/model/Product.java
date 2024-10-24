package com.example.products.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String brand;
    private String category;

    //Embedded is used to allow using another clas in a class without creating a table
    @Embedded
    private Dimension dimensions;

    private double discount;
    private int minOrder;
    private double rating;
    private String availabilityStatus;
    private String warranty;

    //98
    //
    //@ElementCollection allows you to simplify code when you want to implement one-to-many relationship with simple or embedded type.
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images;


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

}
