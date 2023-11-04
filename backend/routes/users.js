const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../utils/validator');
const {
  getUsers, getUser, updateUser, updateAvatar, getMeUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMeUser);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlValidator),
    }),
  }),
  updateAvatar,
);

module.exports = router;
