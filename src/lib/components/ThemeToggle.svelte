<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { MoonSolid, SunSolid } from 'flowbite-svelte-icons';

	const isDark = $derived($theme === 'dark');
</script>

<button
	onclick={() => theme.toggle()}
	class="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
	aria-label="Toggle theme"
>
	{#if isDark}
		<SunSolid class="h-5 w-5" />
	{:else}
		<MoonSolid class="h-5 w-5" />
	{/if}
</button>
