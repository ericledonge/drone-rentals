import React, { useEffect, useState } from 'react';

import { SelectItem } from '../domain/models/models';
import { Action, State } from '../domain/reducers/reducers';
import { quadsInStation, stationsToDisplay } from '../domain/selectors/selectors';

type useRentADroneProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const useRentADrone = ({ state, dispatch }: useRentADroneProps) => {
  const stations: SelectItem[] = stationsToDisplay(state);

  const defaultSelectedStation = stations?.[0];
  const defaultAvailableQuads = quadsInStation(state, defaultSelectedStation?.value);
  const defaultSelectedQuad = defaultAvailableQuads?.[0];

  const [selectedStation, setSelectedStation] =
    useState<SelectItem>(defaultSelectedStation);
  const [availableQuads, setAvailableQuads] =
    useState<SelectItem[]>(defaultAvailableQuads);
  const [selectedQuad, setSelectedQuad] = useState<SelectItem>(defaultSelectedQuad);

  useEffect(() => {
    setAvailableQuads(quadsInStation(state, selectedStation?.value));
  }, [selectedStation]);

  useEffect(() => {
    setSelectedQuad(availableQuads[0]);
  }, [availableQuads]);

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch({
      type: 'RENT_A_QUAD',
      payload: {
        stationId: selectedStation.value,
        quadId: selectedQuad.value,
        rentalStartDatetime: new Date(),
      },
    });
  };

  return {
    stations,
    selectedStation,
    setSelectedStation,
    availableQuads,
    selectedQuad,
    setSelectedQuad,
    onSubmit,
  };
};
