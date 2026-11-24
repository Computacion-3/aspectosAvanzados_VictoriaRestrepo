import { Injectable } from '@nestjs/common';
import { CreateRoutineInput } from './dto/create-routine.input.js';
import { Routine } from './entities/routine.entity.js';
import { RoutinesRepository } from './routines.repository.js';

@Injectable()
export class RoutinesService {
  constructor(private readonly routinesRepository: RoutinesRepository) {}

  findAll(): Routine[] {
    return this.routinesRepository.findAll();
  }

  findOne(id: number): Routine | null {
    return this.routinesRepository.findById(id);
  }

  create(input: CreateRoutineInput): Routine {
    return this.routinesRepository.create(input);
  }
}