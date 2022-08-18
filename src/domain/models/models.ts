export type IdStation = string;
export type IdQuad = string;

type Manufacturer = string;

type Models = string;

type Email = string;

export enum QuadStatus {
  InCharge = 'In charge',
  InFlight = 'In flight',
}

type Status = QuadStatus;

export type Quad = {
  id: IdQuad;
  manufacturer: Manufacturer;
  model: Models;
  maxFlightTimeInMinutes: number;
  chargeInPercentage: number;
  status: Status;
  rentalStartDatetime: Date;
};

export type Station = {
  id: IdStation;
  name: string;
  numberOfTotalSlots: number;
  availableQuadsIds: IdQuad[];
};

export type User = Email | undefined;

export type SelectItem = {
  value: string;
  label: string;
};
