// types for nav bar
export interface ButtonContent {
  link: string;
  text: string;
}

export interface Filter {
  destination?: string;
  priorToDate?: string;
}

export interface LaunchesInput {
  pageSize?: number;
  cursor?: number;
}

export interface FilteredLaunchesInput extends LaunchesInput {
  filter: Filter;
}

export interface Mission {
  name?: string;
  missionPatchSmall?: string;
  missionPatchLarge?: string;
}

export interface Rocket {
  id?: string;
  name?: string;
  type?: string;
}

export interface Launch {
  id?: string;
  site?: string;
  cursor?: number;
  remainingSeats?: number;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  mission?: Mission;
  rocket?: Rocket;
}

export interface LaunchConnection {
  cursor: number;
  hasMore: boolean;
  launches: Launch[];
}
