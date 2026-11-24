import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RoutinesModule } from './routines/routines.module.js';

@Module({
  imports: [
    // Configura GraphQL en modo Code First con Apollo Server y Apollo Sandbox
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      graphiql: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    RoutinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}