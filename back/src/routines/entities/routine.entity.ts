import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Rutina de entrenamiento registrada en el sistema' })
export class Routine {
  // Especificamos () => Int para que GraphQL no genere Float!
  @Field(() => Int, { description: 'Identificador único de la rutina' })
  id!: number;

  @Field({ description: 'Nombre de la rutina' })
  name!: string;

  // nullable: true indica que el campo es opcional en schema.gql (String sin !)
  @Field({ nullable: true, description: 'Descripción opcional de la rutina' })
  description?: string;

  @Field({ description: 'Fecha de creación en formato ISO 8601' })
  createdAt!: string;
}