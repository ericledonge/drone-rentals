import { mapStation } from './map-station';

describe('mapStation', () => {
  const providedStation = {
    id: '0',
    name: 'Westminster',
    maxCapacity: '10',
  };

  it('should return the correct quad', () => {
    const expectedStation = mapStation(providedStation);

    expect(expectedStation).toEqual({
      id: '0',
      name: 'Westminster',
      numberOfTotalSlots: 10,
      availableQuadsIds: [],
    });
  });
});
