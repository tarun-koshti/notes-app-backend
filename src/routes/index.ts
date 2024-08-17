import { Router } from 'express';

const router: Router = Router();

router.use('/admin', require('./adminRoutes'));
router.use('/users', require('./userRoutes'));

module.exports = router;
