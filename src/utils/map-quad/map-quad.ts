import { IdQuad, Quad, QuadStatus } from '../../domain/models/models';

export const mapQuad = (quad: any, id: IdQuad): Partial<Quad> => {
  return {
    id: id,
    manufacturer: quad.manufacturer,
    model: quad.model,
    maxFlightTimeInMinutes: parseInt(quad.maxFlightTime.match(/\d+/)[0]),
    chargeInPercentage: parseInt(quad.charge.match(/\d+/)[0]),
    status: QuadStatus.InCharge,
  };
};
