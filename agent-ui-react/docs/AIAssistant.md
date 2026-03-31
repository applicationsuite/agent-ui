# AIAssistant

The main AI chat assistant component. Provides a full-featured conversational UI with support for multiple agents, conversation history, starter prompts, templates, and AG-UI protocol integration.

## Usage

```tsx
import { AIAssistant } from 'agent-ui-react';

// Option 1: With config (service created internally)
<AIAssistant
  config={{
    api: { baseUrl: 'https://api.example.com' },
    agentConfig: { url: 'https://agent.example.com/run' },
  }}
  getToken={() => acquireTokenSilent()}
  agents={[{ name: 'OrderAgent', description: 'Handles orders' }]}
  userInfo={{ name: 'Jane', email: 'jane@example.com' }}
  permissions={[AIAssistantPermission.View]}
  theme="webLight"
  displayMode={AIAssistantDisplayMode.FullScreen}
  headerText="My AI Assistant"
  greetingText="How can I help you today?"
/>

// Option 2: With custom service
<AIAssistant
  service={myCustomService}
  getToken={() => acquireTokenSilent()}
  agents={[{ name: 'OrderAgent' }]}
  userInfo={{ name: 'Jane', email: 'jane@example.com' }}
/>
```

## Props — `IAIAssistantProps`

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `getToken` | `() => Promise<string>` | Yes | — | Async function returning an access token. |
| `config` | `IAssistantConfig` | Conditional | — | API and agent configuration. **Required** if `service` is not provided. |
| `service` | `IAIAssistantService` | Conditional | — | Custom service. **Required** if `config` is not provided. |
| `agents` | `IAIAssistantAgent[]` | No | `[]` | List of available agents. |
| `userInfo` | `IUserInfo` | No | — | Current user info (name, email). |
| `permissions` | `AIAssistantPermission[]` | No | `[]` | Permissions controlling UI features. |
| `theme` | `AIAssistantTheme` | No | — | Theme: `'light'`, `'dark'`, `'webLight'`, `'webDark'`, or custom string. |
| `displayMode` | `AIAssistantDisplayMode` | No | `'FullScreen'` | Initial display mode. |
| `headerText` | `string` | No | `'AI Assistant'` | Header title text. |
| `greetingText` | `string` | No | — | Greeting shown in empty chat. |
| `className` | `string` | No | — | Additional CSS class for the root element. |
| `onClosePanel` | `() => void` | No | — | Callback when the panel close button is clicked. |
| `getTemplate` | `(params: ITemplateInfo) => any` | No | — | Custom template resolver for external templates. |
| `features` | `AIAssistantFeature[]` | No | All enabled | Whitelist of enabled features. |

### `IAssistantConfig`

| Property | Type | Description |
|----------|------|-------------|
| `api.baseUrl` | `string` | Base URL for the AI Assistant REST API. |
| `agentConfig.url` | `string` | URL for the AG-UI agent endpoint. |

### `IAIAssistantAgent`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | No | Unique agent identifier. |
| `name` | `string` | Yes | Agent name (sent to the API). |
| `description` | `string` | No | Human-readable agent description. |
| `selected` | `boolean` | No | Whether this agent is pre-selected. |

## Enums

### `AIAssistantDisplayMode`

| Value | Description |
|-------|-------------|
| `SidePanel` | Renders as a side panel overlay. |
| `FullScreen` | Renders as a full-screen chat interface. |

### `AIAssistantPermission`

| Value | Description |
|-------|-------------|
| `View` | Basic view access (always granted). |
| `ManageTemplates` | Can create/edit/delete templates. |
| `ManageStarterPrompts` | Can create/edit/delete starter prompts. |

### `AIAssistantFeature`

| Value | Description |
|-------|-------------|
| `conversation_history` | Enable conversation history sidebar. |
| `starter_prompts` | Enable starter prompts management. |
| `templates` | Enable templates management. |
| `settings` | Enable settings panel (model selection). |
| `dynamic_ui` | Enable dynamic UI rendering from agent responses. |
| `developer_tools` | Enable developer tools panel. |

### `IAIAssistantService`

Custom service interface accepted by the `service` prop. When provided, the component delegates all API calls to this implementation instead of creating one internally from `config`.

| Method | Signature | Description |
|--------|-----------|-------------|
| `runAgent` | `(request: IRunAgentRequest) => Promise<IRunAgentResult>` | Runs an agent and returns the response. |
| `getConversationHistory` | `() => Promise<IEntity<IAIAssistantConversation[]>>` | Fetches all conversations for the user. |
| `getConversationMessages` | `(threadId: string) => Promise<IEntity<IAIAssistantMessage[]>>` | Fetches messages for a conversation thread. |
| `getAIModels` | `() => Promise<IEntity<IAIAssistantModel[]>>` | Fetches available AI model deployments. |
| `generateDynamicUi` | `(payload, customPrompt?, model?) => Promise<string \| undefined>` | Generates dynamic HTML UI from agent response data. |
| `getStarterPrompts` | `() => Promise<IEntity<IAIAssistantStarterPrompt[]>>` | Fetches starter prompts. |
| `addStarterPrompt` | `(prompt) => Promise<IEntity<IAIAssistantStarterPrompt>>` | Creates a new starter prompt. |
| `updateStarterPrompt` | `(prompt) => Promise<IEntity<IAIAssistantStarterPrompt>>` | Updates an existing starter prompt. |
| `deleteStarterPrompt` | `(promptId, agentName?) => Promise<IEntity<void>>` | Deletes a starter prompt. |
| `getTemplates` | `() => Promise<IEntity<IAIAssistantTemplate[]>>` | Fetches all templates. |
| `getTemplateById` | `(templateId) => Promise<IEntity<IAIAssistantTemplate>>` | Fetches a template by ID. |
| `addTemplate` | `(template) => Promise<IEntity<IAIAssistantTemplate>>` | Creates a new template. |
| `updateTemplate` | `(template) => Promise<IEntity<IAIAssistantTemplate>>` | Updates an existing template. |
| `deleteTemplate` | `(templateId) => Promise<IEntity<void>>` | Deletes a template. |

### `ITemplateInfo`

Passed to the `getTemplate` callback prop.

| Field | Type | Description |
|-------|------|-------------|
| `templateName` | `string` | Name of the template to resolve. |
| `error` | `string \| undefined` | Error message, if any. |