import { QuadStatus } from '../models/models';
import { Action, reducers, State } from './reducers';

describe('reducers', () => {
  let state: Partial<State>;
  let action: Partial<Action>;

  beforeEach(() => {
    state = {
      stations: {
        byId: {},
        allIds: [],
      },
      quads: {
        byId: {},
        allIds: [],
      },
      user: {
        email: undefined,
      },
    };
  });

  describe('SET_STATIONS', () => {
    it('should add multiple stations to the state', () => {
      action = {
        type: 'SET_STATIONS',
        payload: {
          S1: { id: 'S1', name: 'Station S1' },
          S2: { id: 'S2', name: 'Station S2' },
        },
      };

      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          stations: {
            byId: {
              S1: { id: 'S1', name: 'Station S1' },
              S2: { id: 'S2', name: 'Station S2' },
            },
            allIds: ['S1', 'S2'],
          },
        }),
      );
    });
  });

  describe('SET_QUADS', () => {
    it('should add multiple quads to the state', () => {
      action = {
        type: 'SET_QUADS',
        payload: {
          Q1: { id: 'Q1', model: 'Quad Q1' },
          Q2: { id: 'Q2', model: 'Quad Q2' },
        },
      };

      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          quads: {
            byId: {
              Q1: { id: 'Q1', model: 'Quad Q1' },
              Q2: { id: 'Q2', model: 'Quad Q2' },
            },
            allIds: ['Q1', 'Q2'],
          },
        }),
      );
    });
  });

  describe('SET_USER', () => {
    it('should add the user email to the state', () => {
      action = {
        type: 'SET_USER',
        payload: { email: 'john@example.com' },
      };

      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          user: {
            email: 'john@example.com',
          },
        }),
      );
    });
  });

  describe('ADD_QUAD_TO_STATION', () => {
    describe('when there is no quad in the station', () => {
      it('should add the quad to the station in the state', () => {
        state = {
          stations: {
            byId: {
              S1: { id: 'S1', name: 'Station S1', availableQuadsIds: [] },
              S2: { id: 'S2', name: 'Station S2' },
            },
            allIds: ['S1', 'S2'],
          },
          quads: {
            byId: {
              Q1: { id: 'Q1', model: 'Quad Q1' },
              Q2: { id: 'Q2', model: 'Quad Q2' },
              Q3: { id: 'Q3', model: 'Quad Q3' },
            },
            allIds: ['Q1', 'Q2', 'Q3'],
          },
        };

        action = {
          type: 'ADD_QUAD_TO_STATION',
          payload: {
            stationId: 'S1',
            quadId: 'Q2',
          },
        };

        const newState = reducers(state, action);

        expect(newState).toEqual({
          stations: {
            byId: {
              S1: { id: 'S1', name: 'Station S1', availableQuadsIds: ['Q2'] },
              S2: { id: 'S2', name: 'Station S2' },
            },
            allIds: ['S1', 'S2'],
          },
          quads: {
            byId: {
              Q1: { id: 'Q1', model: 'Quad Q1' },
              Q2: {
                id: 'Q2',
                model: 'Quad Q2',
                status: QuadStatus.InCharge,
                rentalStartDatetime: undefined,
              },
              Q3: { id: 'Q3', model: 'Quad Q3' },
            },
            allIds: ['Q1', 'Q2', 'Q3'],
          },
          rentInProgress: false,
        });
      });
    });

    describe('when there is already a quad in the station', () => {
      it('should add the quad to the station in the state', () => {
        state = {
          stations: {
            byId: {
              S1: { id: 'S1', name: 'Station S1', availableQuadsIds: ['Q1'] },
              S2: { id: 'S2', name: 'Station S2' },
            },
            allIds: ['S1', 'S2'],
          },
          quads: {
            byId: {
              Q1: { id: 'Q1', model: 'Quad Q1' },
              Q2: { id: 'Q2', model: 'Quad Q2' },
              Q3: { id: 'Q3', model: 'Quad Q3' },
            },
            allIds: ['Q1', 'Q2', 'Q3'],
          },
        };

        action = {
          type: 'ADD_QUAD_TO_STATION',
          payload: {
            stationId: 'S1',
            quadId: 'Q2',
          },
        };

        const newState = reducers(state, action);

        expect(newState).toEqual({
          stations: {
            byId: {
              S1: { id: 'S1', name: 'Station S1', availableQuadsIds: ['Q1', 'Q2'] },
              S2: { id: 'S2', name: 'Station S2' },
            },
            allIds: ['S1', 'S2'],
          },
          quads: {
            byId: {
              Q1: { id: 'Q1', model: 'Quad Q1' },
              Q2: {
                id: 'Q2',
                model: 'Quad Q2',
                status: QuadStatus.InCharge,
                rentalStartDatetime: undefined,
              },
              Q3: { id: 'Q3', model: 'Quad Q3' },
            },
            allIds: ['Q1', 'Q2', 'Q3'],
          },
          rentInProgress: false,
        });
      });
    });
  });

  describe('RENT_A_QUAD', () => {
    beforeEach(() => {
      state = {
        stations: {
          byId: {
            S1: { id: 'S1', name: 'Station S1', availableQuadsIds: ['Q1', 'Q2'] },
            S2: { id: 'S2', name: 'Station S2', availableQuadsIds: ['Q3'] },
          },
          allIds: ['S1', 'S2'],
        },
        quads: {
          byId: {
            Q1: { id: 'Q1', model: 'Quad Q1', status: QuadStatus.InCharge },
            Q2: { id: 'Q2', model: 'Quad Q2', status: QuadStatus.InCharge },
            Q3: { id: 'Q3', model: 'Quad Q3', status: QuadStatus.InCharge },
          },
          allIds: ['Q1', 'Q2', 'Q3'],
        },
        rentInProgress: false,
      };

      action = {
        type: 'RENT_A_QUAD',
        payload: {
          stationId: 'S1',
          quadId: 'Q2',
          rentalStartDatetime: new Date('2022-08-15T20:26:03.000Z'),
        },
      };
    });

    it('should change the status of the quad in the state', () => {
      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          quads: {
            byId: {
              Q1: { id: 'Q1', model: 'Quad Q1', status: QuadStatus.InCharge },
              Q2: {
                id: 'Q2',
                model: 'Quad Q2',
                status: QuadStatus.InFlight,
                rentalStartDatetime: new Date('2022-08-15T20:26:03.000Z'),
              },
              Q3: { id: 'Q3', model: 'Quad Q3', status: QuadStatus.InCharge },
            },
            allIds: ['Q1', 'Q2', 'Q3'],
          },
        }),
      );
    });

    it('should indication the rental start datetime in the state', () => {
      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          quads: {
            byId: {
              Q1: { id: 'Q1', model: 'Quad Q1', status: QuadStatus.InCharge },
              Q2: {
                id: 'Q2',
                model: 'Quad Q2',
                status: QuadStatus.InFlight,
                rentalStartDatetime: new Date('2022-08-15T20:26:03.000Z'),
              },
              Q3: { id: 'Q3', model: 'Quad Q3', status: QuadStatus.InCharge },
            },
            allIds: ['Q1', 'Q2', 'Q3'],
          },
        }),
      );
    });

    it('should remove the quadId from the station in the state', () => {
      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          stations: {
            byId: {
              S1: { id: 'S1', name: 'Station S1', availableQuadsIds: ['Q1'] },
              S2: { id: 'S2', name: 'Station S2', availableQuadsIds: ['Q3'] },
            },
            allIds: ['S1', 'S2'],
          },
        }),
      );
    });

    it('should indicate a rent is in the state', () => {
      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          rentInProgress: true,
        }),
      );
    });
  });

  describe('DECLARE_A_LANDING', () => {
    beforeEach(() => {
      state = {
        stations: {
          byId: {
            S1: { id: 'S1', name: 'Station S1', availableQuadsIds: ['Q1', 'Q2'] },
            S2: { id: 'S2', name: 'Station S2', availableQuadsIds: ['Q3'] },
          },
          allIds: ['S1', 'S2'],
        },
        quads: {
          byId: {
            Q1: { id: 'Q1', model: 'Quad Q1', status: QuadStatus.InCharge },
            Q2: { id: 'Q2', model: 'Quad Q2', status: QuadStatus.InCharge },
            Q3: { id: 'Q3', model: 'Quad Q3', status: QuadStatus.InCharge },
            Q4: {
              id: 'Q4',
              model: 'Quad Q4',
              status: QuadStatus.InFlight,
              rentalStartDatetime: new Date('2022-08-15T20:26:03.000Z'),
            },
          },
          allIds: ['Q1', 'Q2', 'Q3', 'Q4'],
        },
        rentInProgress: false,
      };
    });

    it('should land on the selected station', () => {
      action = {
        type: 'ADD_QUAD_TO_STATION',
        payload: {
          quadId: 'Q4',
          stationId: 'S2',
        },
      };

      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          stations: {
            byId: {
              S1: { id: 'S1', name: 'Station S1', availableQuadsIds: ['Q1', 'Q2'] },
              S2: { id: 'S2', name: 'Station S2', availableQuadsIds: ['Q3', 'Q4'] },
            },
            allIds: ['S1', 'S2'],
          },
        }),
      );
    });

    it('should change the rentInProgress in the state', () => {
      action = {
        type: 'LAND_A_QUAD',
        payload: {
          quadId: 'Q4',
        },
      };

      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          rentInProgress: false,
        }),
      );
    });

    it('should change the status and the rental datetime of the quad in the state', () => {
      action = {
        type: 'LAND_A_QUAD',
        payload: {
          quadId: 'Q4',
        },
      };

      const newState = reducers(state, action);

      expect(newState).toEqual(
        expect.objectContaining({
          quads: {
            byId: {
              Q1: { id: 'Q1', model: 'Quad Q1', status: QuadStatus.InCharge },
              Q2: { id: 'Q2', model: 'Quad Q2', status: QuadStatus.InCharge },
              Q3: { id: 'Q3', model: 'Quad Q3', status: QuadStatus.InCharge },
              Q4: {
                id: 'Q4',
                model: 'Quad Q4',
                status: QuadStatus.InCharge,
                rentalStartDatetime: undefined,
              },
            },
            allIds: ['Q1', 'Q2', 'Q3', 'Q4'],
          },
        }),
      );
    });
  });
});
