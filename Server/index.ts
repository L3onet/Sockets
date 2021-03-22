import Server from './classes/server';
import { router } from './routes/router';

const server = new Server();

server.app.use('/', router);

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port}`);
});