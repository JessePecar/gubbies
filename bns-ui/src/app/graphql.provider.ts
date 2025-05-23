import { inject } from '@angular/core';
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from 'apollo-angular/http';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { Kind, OperationTypeNode } from 'graphql';
import { GetAccessToken } from './utilities';

const uri = '://localhost:3000/api';

export const apolloProvider = () => {
  const httpLink = inject(HttpLink);

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = GetAccessToken();

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token || null}`,
      },
    }));

    return forward(operation);
  });

  // Create an http link:
  const http = httpLink.create({
    uri: `http${uri}`,
  });

  // Create a WebSocket link:
  const ws = new GraphQLWsLink(
    createClient({
      url: `ws${uri}`,
      connectionParams: {
        headers: {
          authorization: `Bearer ${GetAccessToken() || null}`,
        },
      },
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
    ApolloLink.from([authMiddleware, http])
  );

  return {
    link,
    cache: new InMemoryCache(),
    // other options...
  };
};
