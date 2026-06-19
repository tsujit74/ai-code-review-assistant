# AI Usage

## Purpose

This application uses AI in two places:
- code review generation,
- codebase chat.

Both features are driven by user-selected AI provider settings stored in the backend.

## AI Provider Model

The application does not depend on a single AI vendor. Instead, each user can configure one or more AI providers with:
- name,
- base URL,
- API key,
- model name,
- active status.

This makes the system compatible with OpenAI-style APIs and similar provider endpoints.

## Provider Configuration

AI provider records are stored per user. A provider entry contains:
- `name` for display,
- `baseUrl` for the API endpoint,
- `apiKey` for authentication,
- `modelName` for the chosen model,
- `isActive` to mark the default provider.

The backend exposes endpoints to create, list, fetch, update, and delete providers. Users can also request the currently active provider.

## Review Usage

### When AI is used
AI is used when a user generates a review for a project.

### Input to the model
The backend builds a prompt from:
- the project’s extracted files,
- the selected review type,
- the provider’s model configuration.

### Output from the model
The AI response is normalized into review data and saved in the database as:
- summary,
- issues,
- recommendations,
- severity,
- status.

### Review types
The schema defines the following review categories:
- `SECURITY`
- `PERFORMANCE`
- `CODE_QUALITY`

### Severity levels
The schema defines the following severity levels:
- `CRITICAL`
- `HIGH`
- `MEDIUM`
- `LOW`
- `INFO`

## Chat Usage

### When AI is used
AI is used when a user sends a message inside a chat session.

### Input to the model
The backend uses:
- the current chat session,
- stored message history,
- the selected AI provider,
- project file context when available.

### Output from the model
The assistant response is stored as a new message in the session with role `ASSISTANT`.

### Message roles
The schema defines:
- `USER`
- `ASSISTANT`

## Request Flow

### Review request
1. User selects a project.
2. User triggers a review.
3. Backend loads project files.
4. Backend loads the user’s active provider or selected provider.
5. Backend sends the prompt to the AI provider.
6. Backend saves the response as a review record.
7. Frontend shows the review result.

### Chat request
1. User opens or creates a chat session.
2. User sends a message.
3. Backend loads session history.
4. Backend sends a provider request using the selected configuration.
5. Backend stores the assistant reply.
6. Frontend renders the updated conversation.

## Provider Compatibility

The backend is designed to work with providers that expose an OpenAI-compatible API format. That gives users flexibility to use different services without changing the app’s core behavior.

Examples of provider types that fit this style include:
- local model servers,
- hosted inference APIs,
- third-party AI gateways.

## Environment Variables

The backend environment includes AI-related configuration values such as:
- provider base URL,
- provider API key,
- provider model name.

These values can be used as defaults or development fallbacks depending on how the backend service is configured.

## Safety Notes

AI provider keys are sensitive credentials and should not be exposed in the frontend. They should remain stored only in secure backend storage and be used only for server-side requests.

Large codebases should be handled carefully to avoid sending unnecessary context to the model. The backend should only include the files or excerpts needed for the review or chat request.