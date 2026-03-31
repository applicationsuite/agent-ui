import './App.css';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './resources/styles/theme';
import { Home } from './components/common/layout/Home';
import type { IPublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { TemplateRenderer } from './components/templates/template-renderer/TemplateRenderer';
import templateJson from './components/templates/template.json';
import serverDataJson from './components/templates/serverData.mock.json';
import { TemplateDesigner } from './components/templates/template-designer';

import templateData from './components/templates/template.json';
import serverData from './components/templates/serverData.mock.json';

interface AppProps {
  msalInstance: IPublicClientApplication;
}

const App = ({ msalInstance }: AppProps) => {
  return (
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <ThemeProvider>
          <Home /> 

          {/* <TemplateRenderer
              data={{ template: templateJson, serverData: serverDataJson }}
              onAction={(action, payload) =>
                console.log('Action:', action, payload)
              }
            />  */}
          {/* <TemplateDesigner template={templateData} dataSource={serverData} /> */}
        </ThemeProvider>
      </MsalProvider>
    </BrowserRouter>
  );
};

export default App;
