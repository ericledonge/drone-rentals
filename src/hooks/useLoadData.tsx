import React, { useEffect, useState } from 'react';

import { quads as quadsDataSource } from '../../resources/data/quads.json';
import { stations as stationsDataSource } from '../../resources/data/stations.json';
import { Action } from '../domain/reducers/reducers';
import { fetchQuads } from '../services/fetch-quads/fetch-quads';
import { fetchStations } from '../services/fetch-stations/fetch-stations';
import { convertArrayToObject } from '../utils/utils';

type useLoadDataProps = {
  dispatch: React.Dispatch<Action>;
};

export const useLoadData = ({ dispatch }: useLoadDataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchStations(stationsDataSource)
      .then((data) =>
        dispatch({ payload: convertArrayToObject(data, 'id'), type: 'SET_STATIONS' }),
      )
      .catch((error) => setIsError(true));

    fetchQuads(quadsDataSource)
      .then((data) =>
        dispatch({ payload: convertArrayToObject(data, 'id'), type: 'SET_QUADS' }),
      )
      .catch((error) => setIsError(true));

    setIsLoading(false);
  }, []);

  return { isLoading, isError };
};
