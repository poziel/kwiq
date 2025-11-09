<script lang="ts">
	import { Button } from 'flowbite-svelte';
</script>

<section
	class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 text-slate-50"
>
	<h1 class="text-4xl font-semibold tracking-tight">KWIQ</h1>
	<p class="text-slate-400">Fast, social quiz nights right in your browser.</p>
	<div class="flex gap-4">
		<Button href="/host" color="primary">Host a game</Button>
		<Button href="/play" color="light">Join a game</Button>
	</div>
</section>
