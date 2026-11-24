import 'server-only';
import { RoutineGraphQLDatasource } from '../infrastructure/datasources/routine-graphql-datasource';
import { RoutineGraphQLRepositoryImpl } from '../infrastructure/repositories/routine-graphql.repository.impl';
import { GetRoutinesUseCase } from '../domain/usecases/get-routines.usecase';
import { CreateRoutineUseCase } from '../domain/usecases/create-routine.usecase';

const datasource = new RoutineGraphQLDatasource();
const routineRepository = new RoutineGraphQLRepositoryImpl(datasource);

export const routineContainer = {
    getRoutines: new GetRoutinesUseCase(routineRepository),
    createRoutine: new CreateRoutineUseCase(routineRepository),
};
export type RoutineContainer = typeof routineContainer;
//comentario para ver si se sube el archivo