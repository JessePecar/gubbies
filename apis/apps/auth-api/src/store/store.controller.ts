import { StoreCreateInput, StoreUpdateInput } from '@auth/store/store.interface';
import { StoreService } from '@auth/store/store.service';
import { User } from '@core/decorators';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get(':id')
  async getStore(@Param('id') id: number) {
    return await this.storeService.getStore(id);
  }

  @Get()
  async getStores(@User() user) {
    return await this.storeService.getStores();
  }

  @Post()
  async createStore(@Body() createStore: StoreCreateInput) {
    return await this.storeService.createStore(createStore);
  }

  @Put()
  async updateStore(@Body() updateStore: StoreUpdateInput) {
    return await this.storeService.updateStore(updateStore);
  }
}
