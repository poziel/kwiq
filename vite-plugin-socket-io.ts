import type { ViteDevServer, Plugin } from 'vite';
import { Server as HTTPServer } from 'http';
import { setupSocketIO } from './src/lib/server/socket';

export function socketIO(): Plugin {
	return {
		name: 'vite-plugin-socket-io',
		configureServer(server: ViteDevServer) {
			if (!server.httpServer) return;

			// Setup Socket.IO on the Vite dev server
			setupSocketIO(server.httpServer as HTTPServer);
		}
	};
}
