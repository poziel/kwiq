<script lang="ts">
	import { Button, Card, Input, Label, Alert } from 'flowbite-svelte';
	import { joinRoom } from '$lib/socket';
	import { browser } from '$app/environment';

	let roomCode = $state('');
	let playerName = $state('');
	let error = $state<string | null>(null);
	let success = $state(false);
	let loading = $state(false);

	async function handleJoin(e: Event) {
		e.preventDefault();
		if (!browser) return;

		if (!roomCode.trim() || !playerName.trim()) {
			error = 'Please enter both room code and your name';
			return;
		}

		loading = true;
		error = null;

		try {
			const result = await joinRoom(roomCode.trim().toUpperCase(), playerName.trim());
			console.log('Joined room:', result);
			success = true;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to join room';
			console.error('Error joining room:', err);
		} finally {
			loading = false;
		}
	}
</script>

<section class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8">
	<Card class="p-4 w-full max-w-md border-slate-800 bg-slate-900">
		<h1 class="mb-4 text-3xl font-semibold tracking-tight text-slate-50">Join a Game</h1>
		<p class="mb-6 text-slate-400">
			Enter the room code provided by your host and choose a name to join the game.
		</p>

		{#if error}
			<Alert color="red" class="mb-4">
				<span class="font-medium">Error:</span>
				{error}
			</Alert>
		{/if}

		{#if success}
			<Alert color="green" class="mb-4">
				<span class="font-medium">Success!</span>
				You have joined the game as {playerName}.
			</Alert>
		{/if}

		<form class="flex flex-col gap-4" onsubmit={handleJoin}>
			<div>
				<Label for="room-code" class="mb-2 text-slate-300">Room Code</Label>
				<Input
					id="room-code"
					bind:value={roomCode}
					placeholder="Enter room code"
					class="border-slate-700 bg-slate-800 text-slate-50 placeholder-slate-500"
					disabled={success || loading}
				/>
			</div>

			<div>
				<Label for="player-name" class="mb-2 text-slate-300">Your Name</Label>
				<Input
					id="player-name"
					bind:value={playerName}
					placeholder="Enter your name"
					class="border-slate-700 bg-slate-800 text-slate-50 placeholder-slate-500"
					disabled={success || loading}
				/>
			</div>

			<div class="mt-2 flex gap-4">
				<Button type="submit" color="primary" class="flex-1" disabled={success || loading}>
					{loading ? 'Joining...' : success ? 'Joined' : 'Join Game'}
				</Button>
				<Button href="/" color="light">Cancel</Button>
			</div>
		</form>
	</Card>
</section>
