import express from 'express'
import {addPreferences, adminLogin, adminSignup, createWaves, fetchFriends, getUser, inviteFriend, login, signup, updateUser } from '../controllers/authController';
import { adminSignupValidation, inviteFriendValidation, loginValidation, userValidation ,validatePreferences, wavevalidation} from '../middlewares/authValidation';
import upload from '../middlewares/multer';

const router=express.Router();

router.post('/adminSignup',adminSignupValidation,adminSignup)
router.post('/adminLogin',loginValidation,adminLogin)
router.post('/signup',userValidation,signup);
router.post('/login',loginValidation,login);
router.get('/getUser/:userId',getUser)
router.put('/updateUser/:userId',updateUser);
router.post('/addPreferences',validatePreferences,addPreferences)
router.post('/inviteFriend/:id',inviteFriendValidation,inviteFriend)
router.get('/fetchFriends/:id',fetchFriends)
router.post('/createWaves/:id',upload.single('photoUrl'),wavevalidation,createWaves)


export default router;