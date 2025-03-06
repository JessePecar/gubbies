import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';

@Injectable()
export class AdjustmentsService {
  constructor(private repository: RepositoryService) {}

  async getAdjustments() {
    var adjustmentEntities = await this.repository.adjustments.findMany();

    return adjustmentEntities;
  }
}
