import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetVendorsService extends Query<{ vendors: any[] }> {
  document = gql``;
}
