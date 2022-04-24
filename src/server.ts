import express, { Request, Response } from 'express';
import product_routes from './handlers/products';
import user_routes from './handlers/users';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(express.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

user_routes(app);
product_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
