const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/user");
const MailHelper = require("../helpers/MailHelper");
const AppConfig = require("../config/app");

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                        const verification_token = crypto.createHash('md5').update(req.body.email).digest("hex") ;
                        const user = new User({
                            ...req.body,
                            _id: new mongoose.Types.ObjectId(),
                            password: hash,
                            verification_token
                        });

                        const mailResponse = MailHelper.sendMail(req.body.email, MailHelper.getNewUserVerificationEmailTemplate(verification_token));
                        mailResponse.then(response => {

                            user.save().then(result => {
                                res.status(201).json({
                                    message: 'User created.'
                                })
                            })

                        }).catch(error => {
                            res.status(500).json({
                                error
                            })
                        })
                    }
                });
            }
        });
};

exports.verify_user = (req, res, next) => {
    User.findOne({verification_token: req.params.validationToken})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Invalid token"
                })
            }

            user.is_verified = true;
            user.verification_token = null;

            user.save( function(err) {
                if (err) {
                    return res.status(500).json({
                        message: "User couldn't save"
                    })
                }
                return res.status(200).json({
                    message: 'Account verified'
                })

            })
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong"
            });
        })
};

exports.forgot_password = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "No such user exists."
                })
            }

            const passwordResetToken = crypto.createHash('md5').update(req.body.email).digest("hex")
            const mailResponse = MailHelper.sendMail(req.body.email, MailHelper.getPasswordResetTokenEmailTemplate(passwordResetToken));

            mailResponse.then(response => {

                user[0].password_reset_token = passwordResetToken;
                user[0].save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            message: "Something went wrong"
                        })
                    }
                    return res.status(200).json({
                        message: "Please check your email to proceed with password reset."
                    })
                })
            })
        })
}
exports.reset_password = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "No user found"
                })
            }

            bcrypt.hash(req.body.new_password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }else {
                    user[0].password = hash;
                    user[0].password_reset_token = null;
                    user[0].save(function(err) {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        }
                        return res.status(200).json({
                            message: "Password updated."
                        })
                    })
                }
            })

        })
        .catch(error => {
            return res.status(500).json({
                error
            })
        })
};
exports.getEmailFromResetToken = (req, res, next) => {
    User.find({password_reset_token: req.params.pswdResetToken})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Invalid reset token"
                })
            }

            return res.status(200).json({
                email: user[0].email,
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: "Something went wrong."
            })
        })
}

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: "Auth failed"
                    });
                }
                if (result) {

                    if (user[0].is_verified) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            AppConfig.JWT_SECRET,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            user: {
                                first_name: user[0].first_name,
                                last_name: user[0].last_name,
                                email: user[0].email
                            },
                            token: token
                        });
                    }else {
                        return res.status(403).json({
                            message: "Please confirm your account first."
                        })
                    }

                }
                res.status(404).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
