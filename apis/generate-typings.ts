import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/bns-api/src/**/*.graphql'],
  path: join(process.cwd(), 'apps/bns-api/graphql.schema.ts'),
  outputAs: 'class',
});

definitionsFactory.generate({
  typePaths: ['./apps/bns-api/src/**/*.graphql'],
  path: join(process.cwd(), '../bns-ui/src/app/interfaces/graphql.schema.ts'),
  outputAs: 'interface',
});
