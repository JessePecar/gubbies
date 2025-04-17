import { GlobalAlertService } from '@/components/alert';
import { ApolloError } from '@apollo/client/errors';
import { GraphQLFormattedError } from 'graphql';

// Will check for errors in the graphql client and do the necessary alerts for errors that occured
export const handleResponse = (
  alertService: GlobalAlertService,
  callback: () => void,
  error?: ApolloError,
  errors?: readonly GraphQLFormattedError[]
) => {
  if (error && error.message) {
    const errorMessage = error.message;

    alertService.addAlert('error', errorMessage, 2000);
    return;
  }

  // If any graphql related errors come back, we will handle them here
  if (errors && !errors.length) {
    errors.forEach(err => {
      alertService.addAlert('error', err.message, 2000);
    });
    return;
  }

  callback();
};
