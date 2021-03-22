import LaunchAPI from './dataSources/launch';

export type DataSources = {
  launchAPI: LaunchAPI;
};

export type Context = {
  dataSources: DataSources;
};

export interface RocketBookingInfo {
  destination: string;
  missionDuration: number;
  maxNumSeats: number;
}

export interface BookingInfo {
  [key: string]: RocketBookingInfo;
  falcon1: RocketBookingInfo;
  falcon9: RocketBookingInfo;
  falconheavy: RocketBookingInfo;
}
