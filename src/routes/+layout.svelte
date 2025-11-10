<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import BackgroundShapes from '$lib/components/BackgroundShapes.svelte';
	import BackgroundWave from '$lib/components/BackgroundWave.svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="app-container relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900"
>
	<!-- Background effects that persist across pages -->
	<BackgroundShapes />
	<BackgroundWave />

	<!-- Page content -->
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
