import { App } from './app';
import 'dotenv/config';
import UserRouter from './routes/userRoutes';
import TeamRoutes from './routes/teamRoutes';

const PORT = process.env.APP_PORT || 3001;

// new App().start(PORT);

const app = new App();

const userRouter = new UserRouter('login');
userRouter.addRoute();
app.addRouter(userRouter.router);

const teamRoutes = new TeamRoutes('teams');
teamRoutes.addRoute();
app.addRouter(teamRoutes.router);

app.start(PORT);
