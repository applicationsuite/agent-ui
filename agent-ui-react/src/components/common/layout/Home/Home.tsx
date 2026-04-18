import { useCallback, useEffect, useRef, useState } from "react";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import { SparkleRegular } from "@fluentui/react-icons";
import { homeStyles } from "./Home.styles";
import { AIAssistant } from "../../../ai-assistant/AIAssistant";
import {
	AIAssistantDisplayMode,
	IAssistantConfig,
} from "../../../ai-assistant/AIAssistant.models";
import { AppConfig } from "../../../../appConfig";
import { HOME_ASSISTANT_AGENTS } from "./Home.models";
import { useAssistantTemplates } from "../../../templates/useAssistantTemplates";
import { mapRolesToPermissions } from "../../../auth-provider/AuthProvider.utils";
import { AuthContext, AuthProvider } from "../../../auth-provider";

const useStyles = makeStyles(homeStyles);

const appConfig = AppConfig.getConfig();
const aguiUrl = appConfig?.agentConfig.url ?? "";
const apiBaseUrl = appConfig?.api.baseUrl ?? "";

const AGENT_CONFIGURATION_ROLE = "agent.configuration";
export const Home = () => {
	const classes = useStyles();
	const [isAssistantVisible, setIsAssistantVisible] = useState(true);
	const [loginError, setLoginError] = useState<string>("");
	const { getTemplate } = useAssistantTemplates();

	const tokenRef = useRef<string>("");
	const refreshTokenRef = useRef<string>("");

	useEffect(() => {
		const login = async () => {
			const email = appConfig?.auth?.email;
			const password = appConfig?.auth?.password;
			if (!email || !password) {
				setLoginError(
					"Set auth.email and auth.password in app.config.dev.json to test AG-UI.",
				);
				return;
			}
			try {
				const res = await fetch(`${apiBaseUrl}/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				});
				if (!res.ok) {
					const body = await res.json().catch(() => ({}));
					setLoginError(body.error || `Login failed (HTTP ${res.status})`);
					return;
				}
				const data = await res.json();
				tokenRef.current = data.token;
				refreshTokenRef.current = data.refreshToken;
				setLoginError("");
			} catch (err) {
				setLoginError("Login error: unable to reach API.");
			}
		};
		login();
	}, []);

	const getAccessToken = useCallback(async (): Promise<string> => {
		if (tokenRef.current) {
			return tokenRef.current;
		}
		// Try refreshing if we have a refresh token
		if (refreshTokenRef.current) {
			try {
				const res = await fetch(`${apiBaseUrl}/auth/refresh`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ refreshToken: refreshTokenRef.current }),
				});
				if (res.ok) {
					const data = await res.json();
					tokenRef.current = data.token;
					refreshTokenRef.current = data.refreshToken;
					return data.token;
				}
			} catch (err) {
				console.error("Token refresh error:", err);
			}
		}
		return "";
	}, []);

	const assistantConfig: IAssistantConfig = {
		api: {
			baseUrl: appConfig?.api.baseUrl ?? "",
		},
		agentConfig: {
			url: aguiUrl,
		},
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
					title={isAssistantVisible ? "Hide AI assistant" : "Open AI assistant"}
					aria-label={
						isAssistantVisible ? "Hide AI assistant" : "Open AI assistant"
					}
					onClick={handleToggleAssistant}
				>
					<SparkleRegular fontSize={18} />
				</button>
			</div>
			<div className={classes.content}>
				{loginError ? (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "100%",
							color: "#c4314b",
							fontSize: "0.9rem",
							padding: "24px",
							textAlign: "center",
						}}
					>
						{loginError}
					</div>
				) : (
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
										permissions={mapRolesToPermissions(value?.roles, [
											AGENT_CONFIGURATION_ROLE,
										])}
										// features={[AIAssistantFeature.ConversationHistory, AIAssistantFeature.StarterPrompts]}
									/>
								)}
							</AuthContext.Consumer>
						</AuthProvider>
					</div>
				)}
			</div>
		</div>
	);
};
