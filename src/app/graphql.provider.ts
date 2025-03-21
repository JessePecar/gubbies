import { inject } from '@angular/core';
import { InMemoryCache, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from 'apollo-angular/http';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { Kind, OperationTypeNode } from 'graphql';

const uri = '://localhost:3000/graphql';

export const apolloProvider = () => {
  const httpLink = inject(HttpLink);
  // Create an http link:
  const http = httpLink.create({
    uri: `http${uri}`,
  });

  // Create a WebSocket link:
  const ws = new GraphQLWsLink(
    createClient({
      url: `ws${uri}`,
    })
  );

  // Using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // Split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    ws,
    http
  );

  return {
    link,
    cache: new InMemoryCache(),
    // other options...
  };
};
