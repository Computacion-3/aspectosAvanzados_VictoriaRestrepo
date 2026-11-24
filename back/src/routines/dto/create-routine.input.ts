import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType({ description: 'Datos necesarios para crear una nueva rutina' })
export class CreateRoutineInput {
  @Field({ description: 'Nombre de la rutina (mínimo 3 caracteres)' })
  @IsString()
  @MinLength(3, { message: 'El nombre de la rutina debe tener al menos 3 caracteres.' })
  @MaxLength(100, { message: 'El nombre de la rutina no puede exceder los 100 caracteres.' })
  name!: string;

  @Field({ nullable: true, description: 'Descripción opcional (mínimo 10 caracteres si se envía)' })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres si se proporciona.' })
  description?: string;
}