<script lang="ts">
	import { Button, Card, Alert, Badge } from 'flowbite-svelte';
	import { createRoom } from '$lib/socket';
	import { browser } from '$app/environment';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

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

<!-- Theme Toggle -->
<div class="absolute top-4 right-4 z-20">
	<ThemeToggle />
</div>

<!-- Main Content -->
<section class="flex min-h-screen flex-col items-center justify-center p-8">
	<Card class="w-full max-w-2xl p-8">
		<h1 class="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Host a Game
		</h1>
		<p class="mb-6 text-gray-600 dark:text-gray-300">
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
			<div
				class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-600 dark:bg-gray-700"
			>
				<p class="mb-2 text-gray-600 dark:text-gray-300">Room Code:</p>
				<Badge color="primary" class="px-6 py-3 font-mono text-2xl">{roomCode}</Badge>
				<p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
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
