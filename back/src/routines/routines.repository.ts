import { Injectable } from '@nestjs/common';
import { CreateRoutineInput } from './dto/create-routine.input.js';
import { Routine } from './entities/routine.entity.js';

@Injectable()
export class RoutinesRepository {
  private readonly routines: Routine[] = [
    {
      id: 1,
      name: 'Torso Fuerza e Hipertrofia',
      description: 'Rutina de tren superior enfocada en empujes y tracciones pesadas.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
      id: 2,
      name: 'Pierna Completa e Isquios',
      description: 'Rutina de tren inferior con énfasis en sentadilla libre y peso muerto.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: 3,
      name: 'Full Body Funcional',
      description: 'Circuito metabólico de cuerpo completo para resistencia y quema calórica.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
  ];

  findAll(): Routine[] {
    return [...this.routines];
  }

  findById(id: number): Routine | null {
    const found = this.routines.find((routine) => routine.id === id);
    return found ? { ...found } : null;
  }

  create(input: CreateRoutineInput): Routine {
    const nextId =
      this.routines.length > 0
        ? Math.max(...this.routines.map((routine) => routine.id)) + 1
        : 1;

    const created: Routine = {
      id: nextId,
      name: input.name.trim(),
      description: input.description?.trim(),
      createdAt: new Date().toISOString(),
    };

    this.routines.push(created);
    return { ...created };
  }
}