import './rental-page.scss';

import React from 'react';
import Select from 'react-select';

import { StateAndDispatch } from '../../domain/reducers/reducers';
import { useRentADrone } from '../../hooks/useRentADrone';

const RentalPage = ({ state, dispatch }: StateAndDispatch) => {
  const {
    stations,
    selectedStation,
    setSelectedStation,
    availableQuads,
    selectedQuad,
    setSelectedQuad,
    onSubmit,
  } = useRentADrone({ state, dispatch });

  return (
    <div className="rental-page">
      <form className="rental-form" onSubmit={onSubmit}>
        <div className="rental-form-section">
          <label htmlFor="email" className="rental-form-field">
            Station
          </label>

          <Select
            value={selectedStation}
            options={stations}
            onChange={(station) => {
              setSelectedStation(station!);
            }}
            placeholder="Station"
            className="rental-form-select"
          />
        </div>

        <div>{`${availableQuads?.length} quads disponibles`}</div>

        <div className="rental-form-section">
          <label htmlFor="email" className="rental-form-field">
            Drone
          </label>

          <Select
            value={selectedQuad}
            options={availableQuads}
            onChange={(quad) => {
              setSelectedQuad(quad!);
            }}
            className="rental-form-select"
          />
        </div>

        <div className="rental-form-section">
          <button type="submit">Rent</button>
        </div>
      </form>
    </div>
  );
};

export default RentalPage;
