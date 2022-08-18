import { Quad } from '../../domain/models/models';
import { mapQuad } from '../../utils/map-quad/map-quad';

export const fetchQuads = async (source: any): Promise<Quad[]> => {
  const quads: Quad[] = source.map((quad: any, index: number) =>
    mapQuad(quad, index.toString()),
  );

  return new Promise<Quad[]>((resolve, reject) => {
    resolve(quads);
  });
};
