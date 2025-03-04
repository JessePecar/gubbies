import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdjustmentService {
  // Get the adjustments for the view adjustment list
  getAdjustments() {}

  // Create a new adjustment process
  createAdjustment() {}

  // Void an adjustment that was completed
  voidAdjustment(id: number) {}

  // Cancel an in progress adjustment
  cancelAdjustment(id: number) {}
}
