<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { config } from '$lib/config';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const { appName, logo } = config;
</script>

<!-- Theme Toggle -->
<div class="absolute top-4 right-4 z-20">
	<ThemeToggle />
</div>

<!-- Main Content -->
<section class="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
	<!-- Logo -->
	{#if logo.url}
		<img src={logo.url} alt={logo.alt} class="h-24 w-24 object-contain" />
	{:else}
		<div
			class="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary-500 text-4xl font-bold text-white shadow-lg"
		>
			{appName.charAt(0)}
		</div>
	{/if}

	<!-- App Name -->
	<h1 class="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl dark:text-white">
		{appName}
	</h1>

	<!-- Tagline -->
	<p class="max-w-md text-center text-lg text-gray-600 dark:text-gray-300">
		Fast, social quiz nights right in your browser.
	</p>

	<!-- Actions -->
	<div class="flex flex-col gap-4 sm:flex-row">
		<Button href="/host" color="primary" size="lg" class="min-w-[160px]">Host a Game</Button>
		<Button href="/play" color="light" size="lg" class="min-w-[160px]">Join a Game</Button>
	</div>
</section>
