import * as express from 'express';
import mongoose from 'mongoose';
import usersRouter from './users/users.router';
import authTokensRouter from './auth-tokens/auth-tokens.router';
import { errorsHandler } from './middlewares/errors';
import config from './config';
import articlesRouter from './articles/articles.router';
import commentsRouter from './comments/comments.router';
import tagsRouter from './tags/tags.router';
import helmet from 'helmet';
import * as cors from 'cors';

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

    await mongoose.connect(
      `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`,
    );
    app.listen(serverPort, () => console.log('Server started on port 3000'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
