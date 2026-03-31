import { useCallback, useEffect, useState } from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { SparkleRegular } from '@fluentui/react-icons';
import { homeStyles } from './Home.styles';
import { AIAssistant } from '../../../ai-assistant/AIAssistant';
import {
  AIAssistantDisplayMode,
  IAssistantConfig,
  IUserInfo,
} from '../../../ai-assistant/AIAssistant.models';
import { AppConfig } from '../../../../appConfig';
import { useMsal } from '@azure/msal-react';
import { HOME_ASSISTANT_AGENTS } from './Home.models';
import { useAssistantTemplates } from '../../../templates/useAssistantTemplates';
import { mapRolesToPermissions } from '../../../auth-provider/AuthProvider.utils';
import { AuthContext, AuthProvider } from '../../../auth-provider';

const useStyles = makeStyles(homeStyles);

const appConfig = AppConfig.getConfig();
const scopes = appConfig?.msal.scopes ?? [];
const aguiUrl = appConfig?.agentConfig.url ?? '';

const AGENT_CONFIGURATION_ROLE = 'agent.configuration';
export const Home = () => {
  const classes = useStyles();
  const { instance } = useMsal();
  const [isAssistantVisible, setIsAssistantVisible] = useState(true);
  const { getTemplate } = useAssistantTemplates();


  const getAccessToken = useCallback(async (): Promise<string> => {
    const account = instance.getActiveAccount() ?? instance.getAllAccounts()[0];
    if (!account) {
      await instance.loginPopup({ scopes });
      return (
        await instance.acquireTokenSilent({
          scopes,
          account: instance.getActiveAccount()!,
        })
      ).accessToken;
    }
    try {
      return (await instance.acquireTokenSilent({ scopes, account }))
        .accessToken;
    } catch {
      return (await instance.acquireTokenPopup({ scopes })).accessToken;
    }
  }, [instance]);

  const assistantConfig: IAssistantConfig = {
    api: {
      baseUrl: appConfig?.api.baseUrl ?? '',
    },
    agentConfig: {
      url: aguiUrl,
    }
  };
  

  const handleToggleAssistant = useCallback(() => {
    setIsAssistantVisible((isVisible) => !isVisible);
  }, []);

  const handleCloseAssistant = useCallback(() => {
    setIsAssistantVisible(false);
  }, []);

  return (
      <div className={classes.root}>
        <div className={classes.navBar}>
          <h1 className={classes.navBarTitle}>Home</h1>
          <button
            className={mergeClasses(
              classes.assistantToggleButton,
              isAssistantVisible && classes.assistantToggleButtonActive,
            )}
            type="button"
            title={isAssistantVisible ? 'Hide AI assistant' : 'Open AI assistant'}
            aria-label={
              isAssistantVisible ? 'Hide AI assistant' : 'Open AI assistant'
            }
            onClick={handleToggleAssistant}
          >
            <SparkleRegular fontSize={18} />
          </button>
        </div>
        <div className={classes.content}>
          <div
            className={mergeClasses(
              classes.assistantContainer,
              !isAssistantVisible && classes.assistantContainerHidden,
            )}
          >
            <AuthProvider config={assistantConfig} getToken={getAccessToken}>
              <AuthContext.Consumer>
                {(value) => (
                  <AIAssistant
                    config={assistantConfig}
                    getToken={getAccessToken}
                    displayMode={AIAssistantDisplayMode.FullScreen}
                    agents={HOME_ASSISTANT_AGENTS}
                    getTemplate={getTemplate}
                    onClosePanel={handleCloseAssistant}
                    userInfo={value?.userInfo}
                    permissions={mapRolesToPermissions(value?.roles, [AGENT_CONFIGURATION_ROLE])}
                    // features={[AIAssistantFeature.ConversationHistory, AIAssistantFeature.StarterPrompts]}
                  />
                )}
              </AuthContext.Consumer>
            </AuthProvider>
          </div>
        </div>
      </div>
  );
};
