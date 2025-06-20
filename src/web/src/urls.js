import * as config from "./config";

// export const LOGIN_URL = `${config.apiBaseUrl}/api/auth/login`;
// export const AUTH_CHECK_URL = `${config.apiBaseUrl}/api/auth/isAuthenticated`;
// export const LOGOUT_URL = `${config.apiBaseUrl}/api/auth/logout`;
export const PROFILE_URL = `${config.apiBaseUrl}/api/users/me`;
// export const USER_URL = `${config.apiBaseUrl}/api/users`;
export const HEALTHCHECK_URL = `${config.apiBaseUrl}/api/healthcheck`;

// App specific URLS
export const SOME_ENDPOINT_URL = `${config.apiBaseUrl}/api/some-endpoint`;

export const MAPS_URL = `${config.apiBaseUrl}/api/maps`;
// export const MAPS_URL = `http://localhost:3001/api/maps`;

// Register URL for historic places
export const REGISTER_URL = `${config.apiBaseUrl}/api/register`;
