const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.use('/', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.all('*', (_, res, next) => {
  next(new NotFoundError('Not Found'));
});

module.exports = router;
