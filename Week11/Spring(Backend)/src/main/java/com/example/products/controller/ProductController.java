package com.example.products.controller;

import com.example.products.model.Product;
import com.example.products.model.ProductRequest;
import com.example.products.service.ProductService;
import org.springframework.web.bind.annotation.*;

//Controller to take client request for crud operations on products

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {

    ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //Get All products
    @GetMapping("/all")
    public List<Product> get(){
        return productService.getAllProducts();
    }

    //search for desired product
    @GetMapping("/search/{query}")
    public List<Product> searchProducts(@PathVariable String query){
        //searchProducts is custom method which is defined in ProductRepository using @Query
        return productService.searchProducts(query);
    }

    //Adding a new product
    @PostMapping("/add")
    public void addProduct(@RequestBody ProductRequest productRequest){
        productService.addProduct(productRequest);
    }
}
