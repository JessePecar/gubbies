import { ApplicationService } from '@auth/application/application.service';
import { Controller, Get, Put, Query } from '@nestjs/common';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}
  @Get()
  async getApplication(@Query('id') id: number) {
    return await this.applicationService.getApplication(id);
  }

  @Put('updateUsersApplication')
  async updateUsersApplication(
    @Query('id') id: number,
    @Query('userId') userId: number,
  ) {
    return await this.applicationService.updateUsersApplication(id, userId);
  }
}
