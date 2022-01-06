import express from "express";

import bcrypt from 'bcryptjs';

import User from '../models/User.model';

import jwt from "jsonwebtoken";

import protectedRoutes from '../middlewares/protectRouter';

const userRouter = express.Router();

const bcryptSalt = 10;


  



//  find user
userRouter.get('/',protectedRoutes, async(req, res, next) => {
    console.log(req.session.currentUser)

    try{
        const foundUser = await User.findById(req.session.currentUser._id);
        res.json(foundUser);
    }catch(err){
        res.json(err)
    }
});


userRouter.post('/signup', (req, res, next) => {
    const { name, password, email } = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    if (name === '' || password === '') {
        res.json({
            errorMessage: 'Indicate a email and a password to sign up'
        });
        return;
    }
    User.findOne({ name })
        .then((user) => {
            if (!user) {
                User.create({
                        name,
                        email,
                        password: hashPass,
                    })
                    .then((result) => {
                        res.json(result)
                    })
                    .catch(error => {
                        next(error);
                    })
            } else {
                res.status(400).json({ errorMessage: "User already exists." });
            }
        })
        .catch(error => {
            next(error)
        });


});

userRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(420).json({
            user: undefined,
            errorMessage: 'Indicate a email and a password to sign up'
        });
        return;
    }

    await User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(421).json({
                    user: undefined,
                    errorMessage: "The email doesn't exist"
                });
                return;
            }
            if (bcrypt.compareSync(password, user.password)) {
                jwt.sign(
                    { id: foundUser.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                      if (err) throw err;
                      // This is where we generate a token for the user
                      res.json({
                        token, // <-- Json Web Token
                        user
                      });
                    }
                  )
            } else {
                res.status(422).json({
                    user: undefined,
                    errorMessage: 'Incorrect user or password'
                });
            }
        })
        .catch(error => {
            next(error)
        })
});

userRouter.post('/logout', (req, res, next) => {
    try{
        req.session.destroy(() => {
            // cannot access session here
            res.json({msg:"Succeessfully logout"});
        });
    }catch(err){
        res.json(err)
    }

});

export default userRouter;