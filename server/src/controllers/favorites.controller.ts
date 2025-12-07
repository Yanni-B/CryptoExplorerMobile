import type { Response } from 'express';
import User from '../models/User';
import type { AuthRequest } from '../middlewares/auth';

export async function listFavorites(req: AuthRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ favorites: user.favorites });
}

export async function addFavorite(req: AuthRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
  const { coinId } = req.body as { coinId?: string };
  if (!coinId) return res.status(400).json({ message: 'coinId required' });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'Not found' });
  if (!user.favorites.includes(coinId)) user.favorites.push(coinId);
  await user.save();
  res.json({ favorites: user.favorites });
}

export async function removeFavorite(req: AuthRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
  const { coinId } = req.params as { coinId?: string };
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'Not found' });
  user.favorites = user.favorites.filter((c) => c !== coinId);
  await user.save();
  res.json({ favorites: user.favorites });
}

export async function clearFavorites(req: AuthRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'Not found' });

  user.favorites = [];
  await user.save();

  res.json({ favorites: [] });
}

