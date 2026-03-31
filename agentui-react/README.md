# agent-ui-react

A React UI component library building agent ui experiences.

## Installation

```bash
npm install --save agent-ui-react@latest
```


---

## Components

| Component | Description | Documentation |
|-----------|-------------|---------------|
| **AuthProvider** | Wraps your app to provide authenticated user info and role-based permissions via React Context. Decodes JWT tokens and fetches user roles from the API. | [AuthProvider Docs](docs/AuthProvider.md) |
| **AIAssistant** | Full-featured conversational AI chat UI with multi-agent support, conversation history, starter prompts, templates, and AG-UI protocol integration. | [AIAssistant Docs](docs/AIAssistant.md) |
| **TemplateRenderer** | Renders JSON-defined `ITemplate` objects against server data. Displays structured, data-bound UI cards with support for 8 control types and data binding. | [TemplateRenderer Docs](docs/TemplateRenderer.md) |
| **TemplateDesigner** | Visual drag-and-drop editor for creating and editing `ITemplate` JSON definitions. Includes property panel, live preview, JSON editing, and data source binding. | [TemplateDesigner Docs](docs/TemplateDesigner.md) |

---

## Release Notes

For detailed release notes, please refer to our [version history](docs/ReleaseNotes.md)

## Code Repository

https://github.com/techtrips/agent-ui

## Dependencies

### Runtime Dependencies

| Package | Description |
|---------|-------------|
| `@ag-ui/client` | AG-UI protocol client for agent communication |
| `@ag-ui/core` | AG-UI protocol core types and utilities |
| `@fluentui/react-components` | Microsoft Fluent UI React component library |
| `react` | React library |
| `react-dom` | React DOM renderer |
| `react-router` | Declarative routing for React |
---

## Authors and Contributors

The project is being initially developed and maintained by [techtrips](https://github.com/techtrips).

The contribution to this library is open, so any contribution is very welcome.
We welcome you to raise issues, add your new requirements or use cases, so that we will close them asap.

For contributing to this library, please [contact us](mailto:visit.chinmaya@gmail.com).
