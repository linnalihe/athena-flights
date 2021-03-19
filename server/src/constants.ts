import { BookingInfo, RocketBookingInfo } from './types';

export const DEFAULT_PAGE_SIZE = 20;

// number of years to increment departure and return dates
export const yearIncrement = 17;

export const defaultBookingInfo: RocketBookingInfo = {
  destination: 'Mars',
  missionDuration: 730,
  maxNumSeats: 20,
};

export const bookingInfo: BookingInfo = {
  falcon1: {
    destination: 'Earth Orbit',
    missionDuration: 7, // Earth days
    maxNumSeats: 5,
  },
  falcon9: {
    destination: 'Moon',
    missionDuration: 30, // Earth days
    maxNumSeats: 10,
  },
  falconheavy: {
    destination: 'Mars',
    missionDuration: 730, // Earth days
    maxNumSeats: 20,
  },
};
