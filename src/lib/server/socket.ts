import { Server as SocketIOServer } from 'socket.io';
import type { Server as HTTPServer } from 'http';

// In-memory storage for rooms (replace with database in future)
const rooms = new Map<string, RoomState>();

interface RoomState {
	code: string;
	hostId: string;
	players: Array<{ id: string; name: string }>;
	status: 'waiting' | 'active' | 'ended';
}

// Generate random room code
function generateRoomCode(): string {
	const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
	let code = '';
	for (let i = 0; i < 6; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return code;
}

export function setupSocketIO(httpServer: HTTPServer) {
	const io = new SocketIOServer(httpServer, {
		cors: {
			origin: '*', // Configure appropriately for production
			methods: ['GET', 'POST']
		}
	});

	io.on('connection', (socket) => {
		console.log('Client connected:', socket.id);

		// Room creation (host)
		socket.on('room:create', (data: { hostId: string }) => {
			const code = generateRoomCode();
			const room: RoomState = {
				code,
				hostId: data.hostId,
				players: [],
				status: 'waiting'
			};

			rooms.set(code, room);
			socket.join(code);

			console.log(`Room created: ${code}`);
			socket.emit('room:created', { code });
		});

		// Room join (player)
		socket.on('room:join', (data: { code: string; name: string }) => {
			const room = rooms.get(data.code.toUpperCase());

			if (!room) {
				socket.emit('error', { message: 'Room not found' });
				return;
			}

			const playerId = socket.id;
			const player = { id: playerId, name: data.name };

			room.players.push(player);
			socket.join(data.code.toUpperCase());

			console.log(`Player ${data.name} joined room ${data.code}`);

			// Notify player
			socket.emit('room:joined', { playerId, state: room });

			// Notify all clients in room of updated state
			io.to(data.code.toUpperCase()).emit('state:update', { state: room });
		});

		// Quiz start
		socket.on('quiz:start', (data: { code: string }) => {
			const room = rooms.get(data.code.toUpperCase());

			if (!room) {
				socket.emit('error', { message: 'Room not found' });
				return;
			}

			if (room.hostId !== socket.id) {
				socket.emit('error', { message: 'Only host can start quiz' });
				return;
			}

			room.status = 'active';
			console.log(`Quiz started in room ${data.code}`);

			io.to(data.code.toUpperCase()).emit('state:update', {
				state: room,
				event: 'quiz:started'
			});
		});

		// Answer submission
		socket.on('answer:submit', (data: { questionId: string; answer: unknown }) => {
			console.log(`Answer submitted by ${socket.id}:`, data);
			// TODO: Process answer and update scores
		});

		// Disconnect
		socket.on('disconnect', () => {
			console.log('Client disconnected:', socket.id);

			// Remove player from rooms
			rooms.forEach((room, code) => {
				const playerIndex = room.players.findIndex((p) => p.id === socket.id);
				if (playerIndex !== -1) {
					room.players.splice(playerIndex, 1);
					io.to(code).emit('state:update', { state: room });
				}
			});
		});
	});

	console.log('Socket.IO server initialized');
	return io;
}
