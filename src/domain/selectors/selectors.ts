import { IdQuad, IdStation, QuadStatus } from '../models/models';
import { State } from '../reducers/reducers';

export const stationsByIdSelector = (state: State) => state.stations?.byId || {};

export const getStationNameById = (state: State, stationId: IdStation) =>
  state.stations?.byId?.[stationId]?.name;

export const stationsToDisplay = (state: State) =>
  state.stations?.allIds.map((id) => ({
    value: id,
    label: getStationNameById(state, id),
  }));

export const stationsWithSlotsToDisplay = (state: State) =>
  state.stations?.allIds
    .filter(
      (id) =>
        state.stations.byId[id].numberOfTotalSlots >
        state.stations.byId[id].availableQuadsIds.length,
    )
    .map((id) => ({
      value: id,
      label: getStationNameById(state, id),
    }));

export const getQuadModelById = (state: State, quadId: IdQuad) =>
  state.quads?.byId?.[quadId]?.model;

export const quadsToDisplay = (state: State) =>
  state.quads?.allIds.map((id) => ({
    value: id,
    label: getQuadModelById(state, id),
  }));

export const quadsInStation = (state: State, stationId: IdStation) =>
  state.stations?.byId?.[stationId]?.availableQuadsIds!.map((quadId: IdQuad) => {
    return {
      value: quadId,
      label: getQuadModelById(state, quadId),
    };
  });

export const isUserLoggedInSelector = (state: State) => state?.user;

export const isRentInProgressSelector = (state: State) => state.rentInProgress;

export const quadRentedSelector = (state: State) => {
  const quadId: IdQuad = state.quads.allIds.filter(
    (id) => state.quads?.byId?.[id]?.status === QuadStatus.InFlight,
  )[0];

  return state.quads?.byId?.[quadId];
};
