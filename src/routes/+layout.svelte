<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Navbar, NavBrand } from 'flowbite-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-slate-950">
	<Navbar class="border-b border-slate-800 bg-slate-900">
		<NavBrand href="/">
			<span class="self-center text-xl font-semibold whitespace-nowrap text-slate-50">KWIQ</span>
		</NavBrand>
	</Navbar>

	{@render children()}
</div>
