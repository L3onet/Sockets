import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import cors from 'cors';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server ( this.app );
        this.io = require("socket.io")(this.httpServer,{
            cors: {
                origin: true,
                credentials: true
            },
        });
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this);
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
        } );
    }

    start( callback: Function ){
        this.app.listen( this.port, callback() );
    }
}