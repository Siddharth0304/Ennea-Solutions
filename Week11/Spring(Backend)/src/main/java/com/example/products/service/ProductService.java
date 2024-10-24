package com.example.products.service;

import com.example.products.model.Product;
import com.example.products.model.ProductRequest;
import com.example.products.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void addProduct(ProductRequest productRequest){
        Product prod = productRequest.getProduct();
        List<String> imageUrls = productRequest.getImages();

        if (imageUrls != null) {
            prod.setImages(imageUrls);
        }

        productRepository.save(prod);
    }

    public List<Product> searchProducts(String query){
        return productRepository.findByKeyword(query);
    }
}
