import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ParseIntPipe } from '@nestjs/common';
import { ReadRequest } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Items')
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query('items')
  async getItems() {
    return this.itemsService.getItems();
  }

  @Query('items')
  async getItemsFromRequest(@Args('request') request: ReadRequest) {
    return this.itemsService.getItemsFromRequest(request);
  }

  @Query('item')
  async getItemById(@Args('id', ParseIntPipe) id: number) {
    return await this.itemsService.getItemById(id);
  }

  // Filter out the items changed to the one with the selected Id
  @Subscription('itemChanged', {
    filter: (payload, variables) => payload.itemChanged.id === variables.id,
  })
  async subscribeToItemChanges(@Args('id', ParseIntPipe) id: number) {
    return pubSub.asyncIterableIterator('itemChanged');
  }

  @Subscription('itemsChanged')
  async subscriveToChanges() {
    return pubSub.asyncIterableIterator('itemsChanged');
  }
}
