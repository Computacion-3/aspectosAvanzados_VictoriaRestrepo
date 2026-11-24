import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoutineInput } from './dto/create-routine.input.js';
import { Routine } from './entities/routine.entity.js';
import { RoutinesService } from './routines.service.js';

@Resolver(() => Routine)
export class RoutinesResolver {
  constructor(private readonly routinesService: RoutinesService) {}

  @Query(() => [Routine], {
    name: 'routines',
    description: 'Obtiene el listado de todas las rutinas registradas',
  })
  findAll(): Routine[] {
    return this.routinesService.findAll();
  }

  @Query(() => Routine, {
    name: 'routine',
    nullable: true,
    description: 'Busca una rutina por su identificador numérico',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Routine | null {
    return this.routinesService.findOne(id);
  }

  @Mutation(() => Routine, {
    name: 'createRoutine',
    description: 'Crea una nueva rutina en el sistema',
  })
  createRoutine(@Args('input') input: CreateRoutineInput): Routine {
    return this.routinesService.create(input);
  }
}