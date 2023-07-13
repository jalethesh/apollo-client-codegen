import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function UserRoute({ Component, roles, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('user')) {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}
