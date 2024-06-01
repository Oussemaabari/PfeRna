// updateproduct.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  productId!: string; // Ensure it's of type string
  product: any;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id']; // No need to convert to number
    this.updateProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    this.getProductDetails();
  }

  getProductDetails() {
    this.productService.getProductById(this.productId).subscribe(
      (data) => {
        this.product = data;
        this.updateProductForm.patchValue({
          name: this.product.name,
          price: this.product.price,
          quantity: this.product.quantity
        });
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  onSubmit() {
    const updatedProduct = this.updateProductForm.value;
    const productIdNumber = Number(this.productId); // Convert to number
  
    this.productService.updateProduct(productIdNumber, updatedProduct).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.router.navigate(['/product-details', this.productId]);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
  

  toggleEditMode() {
    this.editMode = true;
  }

  cancelEdit() {
    this.getProductDetails();
    this.editMode = false;
  }
}
