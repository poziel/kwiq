<script lang="ts">
	import { Button, Card, Alert, Badge } from 'flowbite-svelte';
	import { createRoom } from '$lib/socket';
	import { browser } from '$app/environment';

	let roomCode = $state<string | null>(null);
	let error = $state<string | null>(null);
	let loading = $state(false);

	async function handleCreateRoom() {
		if (!browser) return;

		loading = true;
		error = null;

		try {
			const hostId = crypto.randomUUID();
			const result = await createRoom(hostId);
			roomCode = result.code;
			console.log('Room created:', result.code);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to create room';
			console.error('Error creating room:', err);
		} finally {
			loading = false;
		}
	}
</script>

<section class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8">
	<Card class="p-4 w-full max-w-2xl border-slate-800 bg-slate-900">
		<h1 class="mb-4 text-3xl font-semibold tracking-tight text-slate-50">Host a Game</h1>
		<p class="mb-6 text-slate-400">
			As a host, you can create and control quiz sessions. Create a room to generate a unique code
			that players can use to join your game. You'll be able to start the quiz, advance questions,
			and monitor player progress in real-time.
		</p>

		{#if error}
			<Alert color="red" class="mb-4">
				<span class="font-medium">Error:</span>
				{error}
			</Alert>
		{/if}

		{#if roomCode}
			<div class="mb-6 rounded-lg border border-slate-700 bg-slate-800 p-6 text-center">
				<p class="mb-2 text-slate-400">Room Code:</p>
				<Badge color="primary" class="px-6 py-3 font-mono text-2xl">{roomCode}</Badge>
				<p class="mt-4 text-sm text-slate-500">
					Share this code with players so they can join your game.
				</p>
			</div>
		{/if}

		<div class="flex gap-4">
			{#if !roomCode}
				<Button color="primary" onclick={handleCreateRoom} disabled={loading}>
					{loading ? 'Creating...' : 'Create Room'}
				</Button>
			{/if}
			<Button href="/" color="light">Back to Home</Button>
		</div>
	</Card>
</section>
