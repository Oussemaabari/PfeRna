// add-product.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.addProductForm.value.name);
    formData.append('price', this.addProductForm.value.price);
    formData.append('quantity', this.addProductForm.value.quantity);
    formData.append('image', this.selectedFile);

    this.productService.addProduct(formData).subscribe(
      (response: any) => {
        console.log('Product added successfully:', response);
        this.addProductForm.reset();

        // Navigate back to products page after product is added
        this.router.navigate(['/products']);
      },
      (error: any) => {
        console.error('Error adding product:', error);
        // Handle error
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
}
