import { Args, Query, Resolver } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ParseIntPipe } from '@nestjs/common';

// import { PubSub } from 'graphql-subscriptions';
// const pubSub = new PubSub();

@Resolver('Items')
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query('items')
  async getItems() {
    return this.itemsService.getItems();
  }

  @Query('item')
  async getItemById(@Args('id', ParseIntPipe) id: number) {
    return await this.itemsService.getItemById(id);
  }
}
