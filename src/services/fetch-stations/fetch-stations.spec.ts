import { stations } from '../../../resources/data/stations.json';
import { fetchStations } from './fetch-stations';

describe('fetchStations', () => {
  describe('when there is no station', () => {
    it('should return an empty array of station', async () => {
      const response = await fetchStations([]);

      expect(response).toHaveLength(0);
    });
  });

  describe('when there are stations', () => {
    it('should return the correct number of quads', async () => {
      const response = await fetchStations(stations);

      expect(response).toHaveLength(stations.length);
    });
  });
});
