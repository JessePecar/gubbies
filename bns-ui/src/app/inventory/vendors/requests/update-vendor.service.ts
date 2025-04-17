import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UpdateVendorService extends Query<{ updateVendor: any }> {
  document = gql``;
}
