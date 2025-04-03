import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReadRequest } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';
import { AppAuthGuard } from 'src/guards/app-auth.guard';

const pubSub = new PubSub();

@Resolver('Items')
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(AppAuthGuard)
  @Query('items')
  async getItems() {
    return this.itemsService.getItems();
  }

  @UseGuards(AppAuthGuard)
  @Query('items')
  async getItemsFromRequest(@Args('request') request: ReadRequest) {
    return this.itemsService.getItemsFromRequest(request);
  }

  @UseGuards(AppAuthGuard)
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

  @UseGuards(AppAuthGuard)
  @Subscription('itemsChanged')
  async subscriveToChanges() {
    return pubSub.asyncIterableIterator('itemsChanged');
  }
}
