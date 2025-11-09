import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
	if (!browser) return 'dark';

	const stored = localStorage.getItem('kwiq-theme') as Theme | null;
	if (stored === 'light' || stored === 'dark') return stored;

	// Check system preference
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
		return 'light';
	}

	return 'dark';
}

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>(getInitialTheme());

	return {
		subscribe,
		toggle: () => {
			update((current) => {
				const next: Theme = current === 'light' ? 'dark' : 'light';

				if (browser) {
					localStorage.setItem('kwiq-theme', next);
					// Apply or remove dark class on html element
					if (next === 'dark') {
						document.documentElement.classList.add('dark');
					} else {
						document.documentElement.classList.remove('dark');
					}
				}

				return next;
			});
		},
		init: () => {
			if (browser) {
				const theme = getInitialTheme();
				// Apply or remove dark class on html element
				if (theme === 'dark') {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
				set(theme);
			}
		}
	};
}

export const theme = createThemeStore();
