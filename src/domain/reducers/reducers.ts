import React from 'react';

import { IdQuad, IdStation, Quad, QuadStatus, Station, User } from '../models/models';

export type State = {
  stations: {
    byId: { [id: IdStation]: Station };
    allIds: IdStation[];
  };
  quads: {
    byId: { [id: IdQuad]: Quad };
    allIds: IdQuad[];
  };
  user: User;
  rentInProgress: boolean;
};

export type Action = {
  payload?: any;
  type: string;
};

export type StateAndDispatch = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const createInitialState = (): State => {
  return {
    stations: {
      byId: {},
      allIds: [],
    },
    quads: {
      byId: {},
      allIds: [],
    },
    user: undefined,
    rentInProgress: false,
  };
};

export const reducers = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_STATIONS':
      return {
        ...state,
        stations: {
          byId: action.payload,
          allIds: Object.keys(action.payload),
        },
      };
    case 'SET_QUADS':
      return {
        ...state,
        quads: {
          byId: action.payload,
          allIds: Object.keys(action.payload),
        },
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'ADD_QUAD_TO_STATION': {
      return {
        ...state,
        stations: {
          byId: {
            ...state?.stations?.byId,
            [action.payload.stationId]: {
              ...state?.stations?.byId[action?.payload?.stationId],
              availableQuadsIds: [
                ...(state.stations?.byId[action?.payload?.stationId]?.availableQuadsIds ||
                  []),
                action.payload.quadId,
              ],
            },
          },
          allIds: [...(state.stations?.allIds || [])],
        },
        quads: {
          byId: {
            ...state?.quads?.byId,
            [action.payload.quadId]: {
              ...state?.quads?.byId[action?.payload?.quadId],
              status: QuadStatus.InCharge,
              rentalStartDatetime: undefined,
            },
          },
          allIds: [...(state.quads?.allIds || [])],
        },
        rentInProgress: false,
      };
    }
    case 'RENT_A_QUAD': {
      return {
        ...state,
        stations: {
          byId: {
            ...state?.stations?.byId,
            [action.payload.stationId]: {
              ...state.stations?.byId[action.payload.stationId],
              availableQuadsIds: [
                ...(state.stations?.byId[
                  action?.payload?.stationId
                ]?.availableQuadsIds?.filter(
                  (quadId) => quadId !== action.payload.quadId,
                ) || []),
              ],
            },
          },
          allIds: [...(state.stations?.allIds || [])],
        },
        quads: {
          byId: {
            ...state?.quads?.byId,
            [action.payload.quadId]: {
              ...state?.quads?.byId[action?.payload?.quadId],
              status: QuadStatus.InFlight,
              rentalStartDatetime: action?.payload?.rentalStartDatetime,
            },
          },
          allIds: [...(state.quads?.allIds || [])],
        },
        rentInProgress: true,
      };
    }
    case 'LAND_A_QUAD': {
      return {
        ...state,
        rentInProgress: false,
        quads: {
          byId: {
            ...state?.quads?.byId,
            [action.payload.quadId]: {
              ...state?.quads?.byId[action?.payload?.quadId],
              status: QuadStatus.InCharge,
              rentalStartDatetime: undefined,
            },
          },
          allIds: [...(state.quads?.allIds || [])],
        },
      };
    }
    default:
      return state;
  }
};
