import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export async function register(req: Request, res: Response) {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.status(400).json({ message: 'Champs manquants' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, password: hash });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, favorites: user.favorites } });
  } catch (err: any) {
    if (err?.code === 11000) return res.status(409).json({ message: 'Email déjà utilisé' });
    res.status(500).json({ message: 'Erreur serveur inscription' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Identifiants invalides' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Identifiants invalides' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, favorites: user.favorites } });
  } catch {
    res.status(500).json({ message: 'Erreur serveur connexion' });
  }
}

export async function me(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.userId as string | undefined;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ id: user.id, email: user.email, name: user.name, favorites: user.favorites });
}
