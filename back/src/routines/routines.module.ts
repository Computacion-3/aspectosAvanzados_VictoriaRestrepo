import { Module } from '@nestjs/common';
import { RoutinesRepository } from './routines.repository.js';
import { RoutinesResolver } from './routines.resolver.js';
import { RoutinesService } from './routines.service.js';

@Module({
  providers: [RoutinesResolver, RoutinesService, RoutinesRepository],
})
export class RoutinesModule {}