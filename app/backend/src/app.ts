import * as express from 'express';
import 'express-async-errors';
import cors = require('cors');
import HandlerError from './middlewares/error';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(HandlerError);
    // this.app.use((error:object, req:express.Request, res: express.Response, next: express.NextFunction) => console.log(error));
  }

  public addRouter(router: express.Router) {
    this.app.use(router);
  }

  private config():void {
    const accessControl = {
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
      allowedHeaders: '*',
    };

    this.app.use(express.json());
    this.app.use(cors(accessControl));
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
