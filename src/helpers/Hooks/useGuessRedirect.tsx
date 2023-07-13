import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useGetUserQuery } from '../../types/graphql';

/**
 * This hook is use to redirect the guess to the @param to page
 * If user is logged in then return user state
 * @param to
 * @returns {data, loading, error}
 */
const useGuessRedirect = (to: string = '/') => {
  const { data, loading, error } = useGetUserQuery();
  const history = useHistory();

  useEffect(() => {
    if (loading === false && !data) {
      history.push(to);
    }
  }, [loading, data, history, to]);

  return { userData: data?.user, loading, error };
};

export default useGuessRedirect;
