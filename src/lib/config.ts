import {
	PUBLIC_KWIQ_APP_NAME,
	PUBLIC_KWIQ_LOGO_URL,
	PUBLIC_KWIQ_LOGO_ALT,
	PUBLIC_KWIQ_PRIMARY_COLOR,
	PUBLIC_KWIQ_GRADIENT_FROM,
	PUBLIC_KWIQ_GRADIENT_TO
} from '$env/static/public';

/**
 * Application branding configuration
 * Self-hosters can override these via environment variables
 */
export const config = {
	appName: PUBLIC_KWIQ_APP_NAME || 'KWIQ',
	logo: {
		url: PUBLIC_KWIQ_LOGO_URL || '',
		alt: PUBLIC_KWIQ_LOGO_ALT || 'Logo'
	},
	colors: {
		primary: PUBLIC_KWIQ_PRIMARY_COLOR || '#3B82F6',
		gradientFrom: PUBLIC_KWIQ_GRADIENT_FROM || '#111827',
		gradientTo: PUBLIC_KWIQ_GRADIENT_TO || '#020817'
	}
} as const;
