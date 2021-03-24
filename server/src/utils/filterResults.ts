import { Filter } from '../resolvers/types/launch-input';
import { Launch } from '../resolvers/types/launch';

const filterResults = (launches: Launch[], filter: Filter) => {
  return launches.filter((launch) => {
    if (
      typeof launch.destination === 'undefined' ||
      typeof launch.departureDate === 'undefined'
    ) {
      return false;
    }

    let isDesiredDestination = true;
    if (typeof filter.destination !== 'undefined') {
      isDesiredDestination = filter.destination === launch.destination;
    }

    let isDesiredDate = true;
    if (typeof filter.priorToDate !== 'undefined') {
      // given a year as a parameter, the returned date will be one year before
      // e.g. new Date('2021') will return Dec 31, 2020
      const filterDate = new Date(filter.priorToDate);
      const launchDate = new Date(launch.departureDate);
      isDesiredDate = launchDate.getFullYear() <= filterDate.getFullYear() + 1;
    }

    return isDesiredDestination && isDesiredDate;
  });
};

export default filterResults;
