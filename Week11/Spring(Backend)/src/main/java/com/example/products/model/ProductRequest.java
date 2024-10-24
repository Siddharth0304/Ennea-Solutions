package com.example.products.model;
import lombok.Data;

import java.util.List;

//ProductRequest class is used to combine product and images together as a single request body
@Data
public class ProductRequest {
    private Product product;
    private List<String> images;
}
