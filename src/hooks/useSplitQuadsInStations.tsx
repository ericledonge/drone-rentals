import React, { useEffect } from 'react';

import { Action } from '../domain/reducers/reducers';

type useSplitQuadsInStationsProps = {
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
};

export const useSplitQuadsInStations = ({
  dispatch,
  isLoading,
}: useSplitQuadsInStationsProps) => {
  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      dispatch({
        type: 'ADD_QUAD_TO_STATION',
        payload: { stationId: '0', quadId: i.toString() },
      });
    }

    for (let i = 7; i < 13; i++) {
      dispatch({
        type: 'ADD_QUAD_TO_STATION',
        payload: { stationId: '1', quadId: i.toString() },
      });
    }

    for (let i = 13; i < 20; i++) {
      dispatch({
        type: 'ADD_QUAD_TO_STATION',
        payload: { stationId: '2', quadId: i.toString() },
      });
    }
  }, [isLoading]);
};
