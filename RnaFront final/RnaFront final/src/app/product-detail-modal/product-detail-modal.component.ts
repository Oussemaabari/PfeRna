import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css']
})
export class ProductDetailModalComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({

      name: [this.data.name, Validators.required],
      price: [this.data.price, Validators.required],
      quantity: [this.data.quantity, Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  updateProductInfo(): void {
    if (this.productForm.invalid) {
      return;
    }

    const updatedProductData = this.productForm.value;

    this.productService.updateProduct(this.data.id, updatedProductData).subscribe(
      response => {
        console.log('Product updated successfully:', response);
        this.dialogRef.close(updatedProductData); // Optionally close the modal and pass the updated data
      },
      error => {
        console.error('Failed to update product:', error);
      }
    );
  }
}