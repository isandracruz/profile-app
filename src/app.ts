import express from 'express';
import morgan from 'morgan';
import profileRoutes from './routes/profile.route';

class Application {
    app: express.Application;

    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
    }

    start(){
        this.app.listen(process.env.PORT, () => {
            console.log("Server running on port", process.env.PORT)
        })
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use(profileRoutes);
    }
}

export default Application;