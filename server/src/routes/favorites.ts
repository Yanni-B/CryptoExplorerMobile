import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { addFavorite, listFavorites, removeFavorite, clearFavorites} from '../controllers/favorites.controller';

const router = Router();

router.get('/', auth, listFavorites);
router.post('/', auth, addFavorite);
router.delete('/all', auth, clearFavorites); 
router.delete('/:coinId', auth, removeFavorite);


export default router;
