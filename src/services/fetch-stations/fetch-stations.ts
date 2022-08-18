import { Station } from '../../domain/models/models';
import { mapStation } from '../../utils/map-station/map-station';

export const fetchStations = async (source: any): Promise<Station[]> => {
  const stations: Station[] = source.map((station: any) => mapStation(station));

  return new Promise<Station[]>((resolve, reject) => {
    resolve(stations);
  });
};
