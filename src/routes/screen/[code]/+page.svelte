<script lang="ts">
	import { page } from '$app/stores';
	import { Badge } from 'flowbite-svelte';

	const roomCode = $page.params.code || '';
</script>

<section class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8">
	<div class="w-full max-w-6xl">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-4xl font-semibold tracking-tight text-slate-50">Screen View</h1>
			<Badge color="primary" class="px-4 py-2 text-lg">
				Room: {roomCode.toUpperCase()}
			</Badge>
		</div>

		<div
			class="flex min-h-[500px] flex-col items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-12 text-center"
		>
			<p class="mb-4 text-xl text-slate-400">Waiting for quiz to start...</p>
			<p class="text-slate-500">
				This view will display questions, answers, and live scores during the game.
			</p>
		</div>
	</div>
</section>
