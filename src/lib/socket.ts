import { io, type Socket } from 'socket.io-client';
import { browser } from '$app/environment';

let socket: Socket | null = null;

/**
 * Get or create Socket.IO client connection
 */
export function getSocket(): Socket {
	if (!browser) {
		throw new Error('Socket.IO client can only be used in the browser');
	}

	if (!socket) {
		// Connect to the same host (works in dev and production)
		socket = io({
			autoConnect: true
		});

		socket.on('connect', () => {
			console.log('Socket.IO connected:', socket?.id);
		});

		socket.on('disconnect', () => {
			console.log('Socket.IO disconnected');
		});

		socket.on('error', (error: { message: string }) => {
			console.error('Socket.IO error:', error.message);
		});
	}

	return socket;
}

/**
 * Disconnect Socket.IO client
 */
export function disconnectSocket(): void {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
}

/**
 * Typed event emitters and listeners
 */

// Host events
export function createRoom(hostId: string): Promise<{ code: string }> {
	return new Promise((resolve, reject) => {
		const socket = getSocket();
		socket.emit('room:create', { hostId });

		socket.once('room:created', (data: { code: string }) => {
			resolve(data);
		});

		socket.once('error', (error: { message: string }) => {
			reject(new Error(error.message));
		});
	});
}

export function startQuiz(code: string): void {
	const socket = getSocket();
	socket.emit('quiz:start', { code });
}

// Player events
export function joinRoom(
	code: string,
	name: string
): Promise<{ playerId: string; state: unknown }> {
	return new Promise((resolve, reject) => {
		const socket = getSocket();
		socket.emit('room:join', { code, name });

		socket.once('room:joined', (data: { playerId: string; state: unknown }) => {
			resolve(data);
		});

		socket.once('error', (error: { message: string }) => {
			reject(new Error(error.message));
		});
	});
}

export function submitAnswer(questionId: string, answer: unknown): void {
	const socket = getSocket();
	socket.emit('answer:submit', { questionId, answer });
}

// State updates listener
export function onStateUpdate(callback: (data: { state: unknown; event?: string }) => void): void {
	const socket = getSocket();
	socket.on('state:update', callback);
}

// Remove state update listener
export function offStateUpdate(callback: (data: { state: unknown; event?: string }) => void): void {
	const socket = getSocket();
	socket.off('state:update', callback);
}
