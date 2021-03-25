import { Repository } from 'typeorm';

import { bookingInfo, defaultBookingInfo, yearIncrement } from '../constants';
import { Launch } from '../resolvers/types/launch';
import { Launch as LaunchObj } from '../entities/Launch';

const addYears = (dt: Date, numYears: number) => {
  return new Date(dt.setFullYear(dt.getFullYear() + numYears));
};

const generateBookingInfo = async (
  launches: Launch[],
  seatRepository: Repository<LaunchObj>
) => {
  for (const launch of launches) {
    let startDate = launch.departureDate
      ? new Date(launch.departureDate)
      : new Date(2025, 3, 16); // make sure that a departure date is set if it is undefined
    launch.departureDate = addYears(startDate, yearIncrement); // add years to make date a future date
    startDate = new Date(launch.departureDate);

    let currBookingInfo = defaultBookingInfo;
    const rocketID = launch!.rocket!.id;

    // check if rocket ID exists in booking info
    if (bookingInfo.hasOwnProperty(rocketID)) {
      currBookingInfo = bookingInfo[rocketID];
    }

    // set return date
    const dateIncrement = currBookingInfo.missionDuration;
    launch.returnDate = new Date(
      startDate.setDate(startDate.getDate() + dateIncrement)
    );

    // set destination
    launch.destination = currBookingInfo.destination;

    // set number of seats remaining
    let seat = await seatRepository.findOne({ where: { id: launch.id } });

    if (seat === undefined) {
      seat = new LaunchObj();
      seat.id = launch.id;
      seat.remainingSeats = currBookingInfo.maxNumSeats;
      await seatRepository.save(seat);
      launch.remainingSeats = currBookingInfo.maxNumSeats;
    } else {
      launch.remainingSeats = seat.remainingSeats;
    }
  }

  return launches;
};

export default generateBookingInfo;
