const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

const authRouter = require('./auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { logout } = require('../controllers/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', authRouter);
router.use(auth);
router.post('/signout', logout);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
