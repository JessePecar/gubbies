import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetTiersService extends Query<{
  roleTiers: { tierNumber: number }[];
}> {
  document = gql`
    query {
      roleTiers {
        tierNumber
      }
    }
  `;
}
