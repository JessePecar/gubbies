import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UpdateVendorMutation extends Mutation<{ updateVendor: any }> {
  document = gql``;
}
