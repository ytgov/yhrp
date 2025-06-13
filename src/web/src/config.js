export const NODE_ENV = process.env.NODE_ENV || "development";

let path;
switch (process.env.NODE_ENV) {
  case "production":
    path = `../.env.production`;
    break;
  default:
    path = `../.env.development`;
}

export const environment = process.env.NODE_ENV;
export const apiBaseUrl =
  process.env.NODE_ENV == "production"
    ? "/api/register"
    : "http://localhost:3000";
export const applicationUrl =
  process.env.VUE_APP_FRONTEND_URL || "http://localhost:8080";

export const applicationName = "Yukon Register of Historic Places";
export const applicationIcon = "mdi-leaf";
export const hasSidebar = true;
export const hasSidebarClosable = false;
