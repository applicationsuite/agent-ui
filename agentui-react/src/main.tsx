import React from 'react';
import ReactDOM from 'react-dom/client';
import { PublicClientApplication } from '@azure/msal-browser';
import App from './App';
import { AppConfig } from './appConfig';

const appConfig = AppConfig.getConfig();

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: appConfig?.msal.clientId ?? '',
    authority: appConfig?.msal.authority ?? '',
    redirectUri: window.location.origin,
  },
});

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  msalInstance.initialize().then(() => {
    msalInstance.handleRedirectPromise().then(() => {
      if (
        !msalInstance.getActiveAccount() &&
        msalInstance.getAllAccounts().length === 0
      ) {
        msalInstance.loginRedirect({ scopes: appConfig?.msal.scopes ?? [] });
      } else {
        msalInstance.setActiveAccount(
          msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0],
        );
        root.render(
          <React.StrictMode>
            <App msalInstance={msalInstance} />
          </React.StrictMode>,
        );
      }
    });
  });
}
