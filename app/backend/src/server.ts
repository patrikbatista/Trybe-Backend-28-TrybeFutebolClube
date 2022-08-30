import { App } from './app';
import 'dotenv/config';
import UserRouter from './routes/userRoutes';
import TeamRoutes from './routes/teamRoutes';
import MatchRoutes from './routes/macthRoutes';
import LeaderboardRoutes from './routes/leaderboardRoutes';

const PORT = process.env.APP_PORT || 3001;

// new App().start(PORT);

const app = new App();

const userRouter = new UserRouter('login');
userRouter.addRoute();
app.addRouter(userRouter.router);

const teamRoutes = new TeamRoutes('teams');
teamRoutes.addRoute();
app.addRouter(teamRoutes.router);

const macthRoutes = new MatchRoutes('matches');
macthRoutes.addRoute();
app.addRouter(macthRoutes.router);

const leaderboardRoutes = new LeaderboardRoutes('leaderboard');
leaderboardRoutes.addRoute();
app.addRouter(leaderboardRoutes.router);

app.start(PORT);
