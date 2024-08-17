import { Router } from 'express';
import { AuthenticationController, protect } from '../controllers/authenticationController';
import { UserController } from '../controllers/userController';
import { NotesController } from '../controllers/notesController';

const router: Router = Router();

router.post('/signup', AuthenticationController.signup);
router.post('/login', AuthenticationController.login);
router.post('/verifyOtp', AuthenticationController.verifyOtp);

router.use(protect);

// Notes
router.route('/notes').get(NotesController.getAllNotes).post(NotesController.createNote);

router
  .route('/notes/:id')
  .get(NotesController.getNoteById)
  .patch(NotesController.updateNoteById)
  .delete(NotesController.deleteNoteById);

router.get('/me/notes', NotesController.getMyNotes);

router
  .route('/me')
  .get(UserController.getMyProfile)
  .patch(UserController.updateMyProfile)
  .delete(UserController.deleteMyProfile);

module.exports = router;
