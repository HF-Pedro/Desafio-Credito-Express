import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import indexRouter from "./routes/indexRouter";
import errorHandler from "./middlewares/errorHandler";



dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(indexRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});