import { StoreCreateInput, StoreUpdateInput } from '@auth/store/store.interface';
import { AuthClientService } from '@core/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  constructor(private repository: AuthClientService) {}

  defaultInlcudes = {
    address: true,
    chain: true,
    phone: true,
    storeDepartments: true,
    storeType: true,
  };

  async getStore(storeId: number) {
    return await this.repository.store.findFirst({
      where: {
        id: {
          equals: storeId,
        },
      },
      include: this.defaultInlcudes,
    });
  }

  // TODO: Check the user variables and get the stores based on chain
  async getStores() {
    return await this.repository.store.findMany({
      where: {
        chainId: {
          gt: -1, //TODO: Change to equals the user's chainId
        },
      },
      include: this.defaultInlcudes,
    });
  }

  async updateStore(store: StoreUpdateInput) {
    return await this.repository.store.update({
      where: {
        id: store.id,
      },
      data: store,
    });
  }

  async createStore(store: StoreCreateInput) {
    return await this.repository.store.create({
      data: store,
    });
  }
}
