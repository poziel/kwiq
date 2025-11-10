<script lang="ts">
	// No props needed - purely decorative
</script>

<div class="wave-container pointer-events-none fixed left-0 right-0 bottom-0 w-full overflow-hidden">
	<!-- Multiple wave layers for depth -->
	<svg
		class="wave wave-1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1440 320"
		preserveAspectRatio="none"
	>
		<path
			fill="currentColor"
			fill-opacity="0.05"
			d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,122.7C672,139,768,149,864,138.7C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
		></path>
	</svg>

	<svg
		class="wave wave-2"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1440 320"
		preserveAspectRatio="none"
	>
		<path
			fill="currentColor"
			fill-opacity="0.04"
			d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,213.3C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
		></path>
	</svg>

	<svg
		class="wave wave-3"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1440 320"
		preserveAspectRatio="none"
	>
		<path
			fill="currentColor"
			fill-opacity="0.03"
			d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
		></path>
	</svg>
</div>

<style>
	.wave-container {
		height: 25vh;
		min-height: 200px;
		max-height: 400px;
		min-width: 150vw;
		text-align: center;
	}

	.wave {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		min-width: 100%;
		height: 100%;
		color: currentColor;
		display: block;
	}

	.wave-1 {
		animation: wave-animation-1 20s ease-in-out infinite;
		color: rgb(59 130 246); /* primary-500 */
	}

	.wave-2 {
		animation: wave-animation-2 15s ease-in-out infinite;
		animation-delay: -5s;
		color: rgb(59 130 246);
	}

	.wave-3 {
		animation: wave-animation-3 25s ease-in-out infinite;
		animation-delay: -10s;
		color: rgb(59 130 246);
	}

	:global(.dark) .wave-1,
	:global(.dark) .wave-2,
	:global(.dark) .wave-3 {
		color: rgb(147 197 253); /* primary-300 for dark mode */
	}

	@keyframes wave-animation-1 {
		0%,
		100% {
			transform: translateX(0%) translateY(0%);
		}
		50% {
			transform: translateX(-28%) translateY(6%);
		}
	}

	@keyframes wave-animation-2 {
		0%,
		100% {
			transform: translateX(0%) translateY(0%);
		}
		50% {
			transform: translateX(-25%) translateY(7%);
		}
	}

	@keyframes wave-animation-3 {
		0%,
		100% {
			transform: translateX(0%) translateY(0%);
		}
		50% {
			transform: translateX(-21%) translateY(12%);
		}
	}
</style>
