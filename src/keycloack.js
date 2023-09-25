import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://11.0.0.118:8180/auth/",
 realm: "sample",
 clientId: "costa_cloud",
});

export default keycloak;