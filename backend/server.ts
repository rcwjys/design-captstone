import app from "./app";
import { port } from "./config";

app.listen(process.env.PORT, (): void => {
  console.log(`Application running in http://localhost:${port}`);
});
