import { mapQuad } from './map-quad';

describe('mapQuad', () => {
  const providedQuad = {
    manufacturer: 'Parrot',
    model: 'Anafi',
    maxFlightTime: '25min',
    charge: '0%',
  };

  const providedId = '1';

  it('should return the correct quad', () => {
    const expectedQuad = mapQuad(providedQuad, providedId);

    expect(expectedQuad).toEqual({
      id: '1',
      manufacturer: 'Parrot',
      model: 'Anafi',
      maxFlightTimeInMinutes: 25,
      chargeInPercentage: 0,
      status: 'In charge',
    });
  });
});
