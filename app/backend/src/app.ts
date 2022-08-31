import * as express from 'express';
import 'express-async-errors';
import cors = require('cors');
import HandlerError from './middlewares/error';

import UserRouter from './routes/userRoutes';
import TeamRoutes from './routes/teamRoutes';
import MatchRoutes from './routes/macthRoutes';
import LeaderboardRoutes from './routes/leaderboardRoutes';

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

const application = new App();

const userRouter = new UserRouter('login');
userRouter.addRoute();
application.addRouter(userRouter.router);

const teamRoutes = new TeamRoutes('teams');
teamRoutes.addRoute();
application.addRouter(teamRoutes.router);

const macthRoutes = new MatchRoutes('matches');
macthRoutes.addRoute();
application.addRouter(macthRoutes.router);

const leaderboardRoutes = new LeaderboardRoutes('leaderboard');
leaderboardRoutes.addRoute();
application.addRouter(leaderboardRoutes.router);

// para o server funcionar, é necessario exportar a application
export { App, application };

// A execução dos testes de cobertura depende dessa exportação
const { app } = application;
export default app;
