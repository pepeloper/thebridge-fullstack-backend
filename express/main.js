import express from 'express';
import router from './router.js';
import { connectToDatabase } from './database.js';

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor levantado en el puerto ${PORT}`);
});
