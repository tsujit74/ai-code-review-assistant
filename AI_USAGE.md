# AI Provider Usage Guidelines

## Supported Providers
- OpenAI (GPT-4)
- LM Studio (Local)
- OpenRouter
- Ollama (bonus)

## Default Provider
LM Studio (local, free, no API costs)

## Configuration
AI providers are configured dynamically in the database:
- Base URL
- API Key
- Model Name

## Review Types
- Security Review
- Performance Review
- Code Quality Review

## Output Format
- Summary (text)
- Issues (array with file, line, message, severity)
- Recommendations (array)
- Severity (CRITICAL/HIGH/MEDIUM/LOW/INFO)

## Future Sections
- Provider-specific prompts
- Rate limiting
- Cost optimization