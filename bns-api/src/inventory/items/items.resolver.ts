import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReadRequest } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';
import { AppAuthGuard } from 'src/common/guards';

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
    filter: (payload, variables) => {
      // Type casting
      const pl = payload as { itemChanged: { id: number } };
      const v = variables as { id: number };
      return pl.itemChanged.id === v.id;
    },
  })
  subscribeToItemChanges() {
    return pubSub.asyncIterableIterator('itemChanged');
  }

  @UseGuards(AppAuthGuard)
  @Subscription('itemsChanged')
  subscriveToChanges() {
    return pubSub.asyncIterableIterator('itemsChanged');
  }
}
