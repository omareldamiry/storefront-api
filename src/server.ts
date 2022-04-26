import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import order_routes from './handlers/orders';
import product_routes from './handlers/products';
import user_routes from './handlers/users';

const app: express.Application = express();
const address = '0.0.0.0:3000';

const corsOptions: CorsOptions = {
  allowedHeaders: ['Authorization', 'Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

user_routes(app);
product_routes(app);
order_routes(app);

app.listen(3000, function () {
  /* eslint-disable no-console */
  console.log(`starting app on: ${address}`);
  /* eslint-enable no-console */
});

export default app;
