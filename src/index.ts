import cors from 'cors';
import express from 'express';
import log4js from 'log4js';
import http from 'http';
import socket from 'socket.io';
import BaseRouter from './routes';
import StudyPeople from './stores/StudyPeople';
import initSocket from './sockets';

export const app = express();
export const logger = log4js.getLogger();

export const PeopleStore = new StudyPeople();

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    default: {
      type: 'file',
      filename: 'logs/layer.log',
      pattern: '-yyyy-MM-dd',
      compress: true
    }
  },
  categories: {
    default: {
      appenders: ['default', 'console'],
      level: 'DEBUG'
    }
  }
});
logger.level = 'ALL';

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', BaseRouter);

export const httpServer = http.createServer(app);
export const io = socket(httpServer);

initSocket();
