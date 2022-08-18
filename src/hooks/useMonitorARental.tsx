import { useState } from 'react';

import { SelectItem } from '../domain/models/models';
import { StateAndDispatch } from '../domain/reducers/reducers';
import {
  quadRentedSelector,
  stationsWithSlotsToDisplay,
} from '../domain/selectors/selectors';
import { addMinutes } from '../utils/utils';

export const useMonitorARental = ({ state, dispatch }: StateAndDispatch) => {
  const quadRented = quadRentedSelector(state);

  const stations: SelectItem[] = stationsWithSlotsToDisplay(state) as SelectItem[];
  const defaultSelectedStation = stations?.[0];

  const [isCrashed, setIsCrashed] = useState(false);

  const [selectedStation, setSelectedStation] =
    useState<SelectItem>(defaultSelectedStation);

  const startDate = quadRented.rentalStartDatetime;
  const flightInMinutes = quadRented.maxFlightTimeInMinutes;
  const endDate = addMinutes(flightInMinutes);

  const onLanding = () => {
    dispatch({
      type: 'ADD_QUAD_TO_STATION',
      payload: {
        quadId: quadRented.id,
        stationId: selectedStation.value,
      },
    });

    dispatch({
      type: 'LAND_A_QUAD',
      payload: {
        quadId: quadRented.id,
      },
    });
  };

  const onCrashing = () => {
    dispatch({
      type: 'ADD_QUAD_TO_STATION',
      payload: {
        quadId: quadRented.id,
        stationId: selectedStation.value,
      },
    });

    setIsCrashed(true);
  };

  return {
    stations,
    selectedStation,
    setSelectedStation,
    quadRented,
    startDate,
    endDate,
    onLanding,
    isCrashed,
    onCrashing,
  };
};
