import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequlizeStore from "connect-session-sequelize";
import userRoute from "./routes/UserRoute.js";
import attendanceRoute from "./routes/AttendanceRoute.js";
import authRoute from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();

const sessionStore = SequlizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async () => {
//     try {
//         await db.authenticate();
//         console.log('Connection has been established successfully');  
//         // await db.sync();
//     } catch (error) {
//         console.log('Unable to connect to database: ', error);
//     }
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
    },
}));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5175'],
}))

app.use(express.json());
app.use(userRoute);
app.use(attendanceRoute);
app.use(authRoute);
app.use("/uploads", express.static("uploads"));

store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running');
});
