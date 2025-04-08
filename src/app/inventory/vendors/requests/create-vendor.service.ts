import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateVendorService extends Query<{ createVendor: any }> {
  document = gql``;
}
