import { Router } from 'express';
// import { protect } from '../controllers/authenticationController';
import { AdminUserController } from '../controllers/adminController';
import { NotesController } from '../controllers/notesController';

const router: Router = Router();

// router.use(protect);

// Notes
router.route('/notes').get(NotesController.getAllNotes).post(NotesController.createNote);
router
  .route('/notes/:id')
  .get(NotesController.getNoteById)
  .patch(NotesController.updateNoteById)
  .delete(NotesController.deleteNoteById);

// Users
router.route('/users').get(AdminUserController.getAllUsers).post(AdminUserController.createUser);

router
  .route('/users/:id')
  .get(AdminUserController.getUserById)
  .patch(AdminUserController.updateUserById)
  .delete(AdminUserController.deleteUserById);

router.get('/users/:id/notes', NotesController.getNotesByUser);

module.exports = router;
