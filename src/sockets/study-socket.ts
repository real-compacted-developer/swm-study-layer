import { Socket } from 'socket.io';
import { io, logger, PeopleStore } from '../index';

export const joinSocket = (socket: Socket, data: any) => {
  const { roomId, userId } = data;
  const current = PeopleStore.join(roomId, userId);
  socket.join(roomId);
  io.sockets.in(roomId).emit('getPeople', current.length);
  logger.info(`${userId}가 ${roomId} 스터디룸에 입장하였습니다.`);
};

export const exitSocket = (socket: Socket, data: any) => {
  const { roomId, userId } = data;
  PeopleStore.quit(roomId, userId);
  socket.leave(roomId);
  logger.info(`${userId}가 ${roomId} 스터디룸에서 퇴장하였습니다.`);
};
