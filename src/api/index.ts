import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { userRouter, dataRouter } from "./routes";
import * as config from "./config";
import { doHealthCheck } from "./utils/healthCheck";
// import { configureAuthentication } from './routes/auth';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'", "https://test.heritage.ynet.gov.yk.ca"],
      "base-uri": ["'self'"],
      "block-all-mixed-content": [],
      "font-src": ["'self'", "https:", "data:"],
      "frame-ancestors": ["'self'"],
      "img-src": ["'self'", "data:"],
      "object-src": ["'none'"],
      "script-src": ["'self'"],
      "script-src-attr": ["'none'"],
      "style-src": ["'self'", "https:", "'unsafe-inline'"],
    },
  })
);

// very basic CORS setup
app.use(
  cors({
    origin: config.FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// configureAuthentication(app);

app.get("/api/healthCheck", (req: Request, res: Response) => {
  doHealthCheck(res);
});

// app.use('/api/user', userRouter);
// app.use('/api/data', dataRouter);

let baseWebPath = "/web";

if (config.NODE_ENV !== "production") baseWebPath = "/dist/web";

// serves the static files generated by the front-end
app.use(express.static(__dirname + baseWebPath));

// if no other routes match, just send the front-end
app.use((req: Request, res: Response) => {
  res.sendFile(__dirname + baseWebPath + "/index.html");
});

app.listen(config.API_PORT, () => {
  console.log(`API listenting on port ${config.API_PORT}`);
});
