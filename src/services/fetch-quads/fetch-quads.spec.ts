import { quads } from '../../../resources/data/quads.json';
import { fetchQuads } from './fetch-quads';

describe('fetchQuads', () => {
  describe('when there is no quad', () => {
    it('should return an empty array of quads', async () => {
      const response = await fetchQuads([]);

      expect(response).toHaveLength(0);
    });
  });

  describe('when there are quads', () => {
    it('should return the correct number of quads', async () => {
      const response = await fetchQuads(quads);

      expect(response).toHaveLength(quads.length);
    });
  });
});
