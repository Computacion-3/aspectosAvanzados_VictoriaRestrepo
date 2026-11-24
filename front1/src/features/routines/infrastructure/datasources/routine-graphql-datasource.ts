import { RoutineDatasource } from './routine-datasource.interface';
import { RoutineResponseDto, CreateRoutineDto } from '../dtos/routine.dto';

interface GraphQLRoutine {
    id: number;
    name: string;
    description?: string | null;
    createdAt: string;
}

interface GraphQLResponse<T> {
    data?: T;
    errors?: Array<{ message: string }>;
}

const DEFAULT_GRAPHQL_URL = 'http://localhost:4000/graphql';

export class RoutineGraphQLDatasource implements RoutineDatasource {
    private readonly endpoint: string;

    constructor(endpoint: string = process.env.GRAPHQL_URL ?? DEFAULT_GRAPHQL_URL) {
        this.endpoint = endpoint;
    }

    private async request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status} al consultar GraphQL`);
        }

        const payload: GraphQLResponse<T> = await response.json();

        if (payload.errors && payload.errors.length > 0) {
            throw new Error(payload.errors.map((e) => e.message).join(' | '));
        }

        if (!payload.data) {
            throw new Error('La respuesta de GraphQL no contiene datos.');
        }

        return payload.data;
    }

    private toResponseDto(item: GraphQLRoutine): RoutineResponseDto {
        return {
            id: item.id,
            name: item.name,
            description: item.description ?? undefined,
            created_at: item.createdAt,
        };
    }

    async fetchRoutines(): Promise<RoutineResponseDto[]> {
        const query = `
            query FetchRoutines {
                routines {
                    id
                    name
                    description
                    createdAt
                }
            }
        `;

        const data = await this.request<{ routines: GraphQLRoutine[] }>(query);
        return data.routines.map((r) => this.toResponseDto(r));
    }

    async fetchRoutineById(id: number): Promise<RoutineResponseDto | null> {
        const query = `
            query FetchRoutineById($id: Int!) {
                routine(id: $id) {
                    id
                    name
                    description
                    createdAt
                }
            }
        `;

        const data = await this.request<{ routine: GraphQLRoutine | null }>(query, { id });
        return data.routine ? this.toResponseDto(data.routine) : null;
    }

    async createRoutine(dto: CreateRoutineDto): Promise<RoutineResponseDto> {
        const mutation = `
            mutation CreateRoutine($input: CreateRoutineInput!) {
                createRoutine(input: $input) {
                    id
                    name
                    description
                    createdAt
                }
            }
        `;

        const data = await this.request<{ createRoutine: GraphQLRoutine }>(mutation, {
            input: {
                name: dto.name,
                description: dto.description,
            },
        });

        return this.toResponseDto(data.createRoutine);
    }
}