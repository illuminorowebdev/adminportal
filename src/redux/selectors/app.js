export const appSelector = (state) => state.app;
export const appProfileSelector = (state) => appSelector(state).profile;
export const appRefreshedSelector = (state) => appSelector(state).refreshed;
export const appLoadingSelector = (state) => appSelector(state).loading;
