import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetVendorService extends Query<{ vendor: any }> {
  document = gql``;
}
