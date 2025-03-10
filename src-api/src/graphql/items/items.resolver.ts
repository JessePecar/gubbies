import { Query, Resolver } from '@nestjs/graphql';
import { ItemsService } from './items.service';

// import { PubSub } from 'graphql-subscriptions';
// const pubSub = new PubSub();

@Resolver('api/items')
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query('')
  async getItems() {
    return this.itemsService.getItems();
  }
}
