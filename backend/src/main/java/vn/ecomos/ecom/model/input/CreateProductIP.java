package vn.ecomos.ecom.model.input;


import lombok.Data;
import vn.ecomos.ecom.model.product.Product;
import vn.ecomos.ecom.model.product.ProductVariant;

import java.util.List;

@Data
public class CreateProductIP {
    private Product product;
    private List<ProductVariant> productVariants ;
}
