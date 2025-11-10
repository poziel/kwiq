<script lang="ts">
	import { page } from '$app/stores';
	import { Badge } from 'flowbite-svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const roomCode = $page.params.code || '';
</script>

<!-- Theme Toggle -->
<div class="absolute top-4 right-4 z-20">
	<ThemeToggle />
</div>

<!-- Main Content -->
<section class="flex min-h-screen flex-col items-center justify-center p-8">
		<div class="w-full max-w-6xl">
			<div class="mb-8 flex items-center justify-between">
				<h1 class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
					Screen View
				</h1>
				<Badge color="primary" class="px-4 py-2 text-lg">
					Room: {roomCode.toUpperCase()}
				</Badge>
			</div>

			<div
				class="flex min-h-[500px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800/50"
			>
				<p class="mb-4 text-xl text-gray-700 dark:text-gray-200">Waiting for quiz to start...</p>
				<p class="text-gray-500 dark:text-gray-400">
					This view will display questions, answers, and live scores during the game.
				</p>
			</div>
		</div>
</section>
