import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import articlesRouter from './articles/articles.router';
import authTokensRouter from './auth-tokens/auth-tokens.router';
import commentsRouter from './comments/comments.router';
import config from './config';
import { errorsHandler } from './middlewares/errors';
import tagsRouter from './tags/tags.router';
import usersRouter from './users/users.router';

// Ensure virtual fields are serialised.
mongoose.set('toJSON', {
  virtuals: true,
});

const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authTokensRouter);
app.use(usersRouter);
app.use(articlesRouter);
app.use(commentsRouter);
app.use(tagsRouter);

app.use(errorsHandler);

const start = async () => {
  try {
    const serverPort = config.get<number>('server.port');
    const { user, password, host, port, database } = config.get('database');
    console.log();
    
    await mongoose.connect(
      user ? `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin` : `mongodb://${host}:${port}/${database}`,
    );
    app.listen(serverPort, () => console.log('Server started on port 3000'));
  } catch (error) {
    console.error(error);
  }
};

start();
