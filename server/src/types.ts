import LaunchAPI from './dataSources/launch';

export type DataSources = {
  launchAPI: LaunchAPI;
};

export type Context = {
  dataSources: DataSources;
};
