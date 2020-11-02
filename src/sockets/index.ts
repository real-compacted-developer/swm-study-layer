import { io } from '../index';
import { exitSocket, getPeopleSocket, joinSocket } from './study-socket';

const initSocket = () => {
  io.on('connection', (socket) => {
    socket.on('join', (data) => joinSocket(socket, data));
    socket.on('exit', (data) => exitSocket(socket, data));
    socket.on('getPeople', (data) => getPeopleSocket(socket, data));
  });
};

export default initSocket;
