import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-to-stock-modal',
  templateUrl: './add-to-stock-modal.component.html',
  styleUrls: ['./add-to-stock-modal.component.css']
})
export class AddToStockModalComponent implements OnInit {
  addToStockForm!: FormGroup;
  productQuantity: number = 0; // Variable to store the available quantity of the product

  constructor(
    public dialogRef: MatDialogRef<AddToStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productQuantity = this.data.quantity; // Assign the available quantity of the product
    this.addToStockForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]], // Ensure quantity is > 0
      date: [new Date(), Validators.required],
      name: ['', Validators.required], // Designation field
      movementType: ['', [Validators.required, Validators.pattern(/^(ENTREE|SORTIE)$/i)]]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  addToStock(): void {
    if (this.addToStockForm.invalid) {
      return;
    }
  
    const { quantity, date, movementType, name } = this.addToStockForm.value;
    const productId = this.data.productId;
  
    // Determine the actual quantity based on the movement type
    const actualQuantity = movementType === 'ENTREE' ? quantity : -quantity;
  
    this.productService.addProductToStock(productId, actualQuantity, movementType, date, name).subscribe(
      response => {
        console.log('Product added to stock successfully:', response);
        this.dialogRef.close(); // Optionally close the modal after adding to stock
      },
      error => {
        console.error('Failed to add product to stock:', error);
      }
    );
  }
}
