import { stationsByIdSelector } from './selectors';

describe('stationsByIdSelector', () => {
  it('should return stations by Id', () => {
    const state = {
      stations: {
        byId: {
          S1: { id: 'S1', name: 'Station S1', availableQuadsIds: ['Q1'] },
          S2: { id: 'S2', name: 'Station S2' },
        },
        allIds: ['S1', 'S2'],
      },
    };

    expect(stationsByIdSelector(state)).toEqual(state.stations.byId);
  });
});
