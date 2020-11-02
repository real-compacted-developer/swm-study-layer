import { Socket } from 'socket.io';
import { logger, PeopleStore } from '../index';

export const joinSocket = (socket: Socket, data: any) => {
  const { roomId, userId } = data;
  PeopleStore.join(roomId, userId);
  socket.join(roomId);
  logger.info(`${userId}가 ${roomId} 스터디룸에 입장하였습니다.`);
};

export const exitSocket = (socket: Socket, data: any) => {
  const { roomId, userId } = data;
  PeopleStore.quit(roomId, userId);
  socket.leave(roomId);
  logger.info(`${userId}가 ${roomId} 스터디룸에서 퇴장하였습니다.`);
};

export const getPeopleSocket = (socket: Socket, data: any) => {
  const { roomId } = data;
  const result = PeopleStore.getPeople(roomId);
  socket.emit('getPeople', result);
  logger.info(`${roomId} 스터디룸의 참여자 목록을 불러왔습니다.`);
};
