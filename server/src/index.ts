import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import favoriteRoutes from './routes/favorites';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);


// Décommenter si votre MangoDB roule sur Docker et remplacer localhost par le nom du service Docker
// const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/projet_final_mobile';
const URI = process.env.MONGO_URI || 'mongodb://admin:1234@localhost:27017/projet_final_mobile?authSource=admin';
const PORT = Number(process.env.PORT || 4000);

async function start() {
  await mongoose.connect(URI);
  // écoute sur toutes les interfaces pour LAN / Expo réel
  app.listen(PORT, '0.0.0.0', () => console.log(`API listening on http://0.0.0.0:${PORT}`));
}

if (process.env.NODE_ENV !== 'test') {
  start().catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
}

export default app;
