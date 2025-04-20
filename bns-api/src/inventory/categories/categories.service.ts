import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/common/repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: RepositoryService) {}

  
}
