import { useCallback } from "react";
import type { ITemplateInfo } from "../ai-assistant/AIAssistant.models";
import { getTemplateComponent } from "./templateRegistry";

export const useAssistantTemplates = () => {
	const getTemplate = useCallback((template: ITemplateInfo) => {
		return getTemplateComponent(template);
	}, []);

	return {
		getTemplate,
	};
};
