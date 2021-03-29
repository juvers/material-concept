export const msalConfig = {
    authority: process.env.REACT_APP_AUTHORITY,
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: document.getElementById('root').baseURI
};