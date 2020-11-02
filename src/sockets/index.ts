import { io } from '../index';
import { exitSocket, joinSocket } from './study-socket';

const initSocket = () => {
  io.on('connection', (socket) => {
    socket.on('join', (data) => joinSocket(socket, data));
    socket.on('exit', (data) => exitSocket(socket, data));
  });
};

export default initSocket;
