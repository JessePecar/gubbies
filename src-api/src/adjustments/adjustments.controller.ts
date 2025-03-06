import { Controller, Get } from '@nestjs/common';
import { AdjustmentsService } from './adjustments.service';

@Controller('adjustments')
export class AdjustmentsController {
  constructor(private readonly adustmentService: AdjustmentsService) {}

  @Get('/')
  async getAdjustments() {
    return await this.adustmentService.getAdjustments();
  }
}
