# AuthProvider

Wraps your application (or a subtree) to provide authenticated user information and role-based permissions via React Context. It decodes the JWT token to extract user info and fetches user roles from the API.

## Usage

```tsx
import { AuthProvider } from 'agent-ui-react';

// With config (service created internally)
<AuthProvider
  config={{ api: { baseUrl: 'https://api.example.com' } }}
  getToken={() => acquireTokenSilent()}
>
  <App />
</AuthProvider>

// With a custom service implementation
<AuthProvider
  service={myCustomAuthService}
  getToken={() => acquireTokenSilent()}
>
  <App />
</AuthProvider>
```

## Props — `IAuthProviderProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Child components that can consume the auth context. |
| `getToken` | `() => Promise<string>` | Yes | Async function that returns a valid access token (e.g. from MSAL). |
| `config` | `IAuthProviderConfig` | Conditional | API configuration. **Required** if `service` is not provided. |
| `service` | `IAuthProviderService` | Conditional | Custom service implementation. **Required** if `config` is not provided. |

> **Note:** You must provide either `config` or `service` (or both). When both are provided, `service` takes precedence.

### `IAuthProviderConfig`

| Property | Type | Description |
|----------|------|-------------|
| `api.baseUrl` | `string` | Base URL for the auth API (e.g. `https://api.example.com`). |

### `IAuthProviderService`

Custom service interface accepted by the `service` prop.

| Method | Signature | Description |
|--------|-----------|-------------|
| `getRoles` | `(userInfo: IUserInfo) => Promise<string[]>` | Fetches the user's roles. |

### `IUserInfo`

Represents the authenticated user. Provided to child components via context and passed to `getRoles()`.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string \| undefined` | User's display name (from JWT `name` claim). |
| `email` | `string \| undefined` | User's email (from `email`, `preferred_username`, or `upn` claim). |