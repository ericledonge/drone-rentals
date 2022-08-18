import { Station } from '../../domain/models/models';

export const mapStation = (station: any): Station => {
  return {
    id: station.id,
    name: station.name,
    numberOfTotalSlots: parseInt(station.maxCapacity),
    availableQuadsIds: [],
  };
};
