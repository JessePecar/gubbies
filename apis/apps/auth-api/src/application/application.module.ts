import { ApplicationController } from '@auth/application/application.controller';
import { ApplicationService } from '@auth/application/application.service';
import { AuthClientService, AuthRepositoryModule } from '@core/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthRepositoryModule],
  providers: [ApplicationService, ApplicationController, AuthClientService],
})
export class ApplicationModule {}
