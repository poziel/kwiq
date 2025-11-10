<script lang="ts">
	type ShapeType = 'circle' | 'square' | 'triangle';

	// Generate shape positions, sizes, animations, and types
	const shapes = Array.from({ length: 40 }, (_, i) => ({
		id: i,
		left: Math.random() * 100,
		top: Math.random() * 100,
		size: Math.random() * 5 + 3, // 3-8px
		opacity: Math.random() * 0.07 + 0.05, // 0.05-0.12 for light mode
		darkOpacity: Math.random() * 0.07 + 0.05, // 0.03-0.08 for dark mode
		delay: Math.random() * 8,
		duration: Math.random() * 10 + 15, // 15-25s
		type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as ShapeType
	}));
</script>

<div class="shapes-container pointer-events-none fixed inset-0 overflow-hidden">
	{#each shapes as shape (shape.id)}
		<div
			class="shape shape-{shape.type} bg-primary-400 dark:bg-primary-300"
			style="
				left: {shape.left}%;
				top: {shape.top}%;
				width: {shape.type === 'triangle' ? '0' : shape.size + 'px'};
				height: {shape.type === 'triangle' ? '0' : shape.size + 'px'};
				opacity: {shape.opacity};
				--dark-opacity: {shape.darkOpacity};
				--shape-size: {shape.size}px;
				animation-delay: {shape.delay}s;
				animation-duration: {shape.duration}s;
				{shape.type === 'triangle'
				? `border-left: ${shape.size / 2}px solid transparent;
					   border-right: ${shape.size / 2}px solid transparent;
					   border-bottom: ${shape.size}px solid currentColor;`
				: ''}
			"
		></div>
	{/each}
</div>

<style>
	.shape {
		position: absolute;
		animation: float infinite ease-in-out;
	}

	.shape-circle {
		border-radius: 50%;
	}

	.shape-square {
		border-radius: 1px;
	}

	.shape-triangle {
		background: transparent !important;
	}

	:global(.dark) .shape {
		opacity: var(--dark-opacity) !important;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(10px, -15px) scale(1.1);
		}
		50% {
			transform: translate(-5px, -25px) scale(0.9);
		}
		75% {
			transform: translate(15px, -10px) scale(1.05);
		}
	}
</style>
