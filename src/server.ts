import { httpServer, logger } from './index';

const PORT = 8080;
httpServer.listen(PORT, () => logger.info(`Study layer server listening on ${PORT}`));
