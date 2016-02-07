/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    signup: function (req, res) {

        var Passwords = require('machinepack-passwords');

        Passwords.encryptPassword({
            password: req.param('password'),
            difficulty: 10
        }).exec({
            error: function (err) {
                return res.negotiate(err);
            },
            success: function (encryptedPassword) {
                User.create({
                    firstName: req.param('firstName'),
                    lastName: req.param('lastName'),
                    email: req.param('email'),
                    encryptedPassword: encryptedPassword,
                    lastLoginDate: new Date()
                }, function (err, createdUser) {
                    if (err) {
                        return res.badRequest(err.invalidAttributes);
                    }
                    req.session.userId = createdUser.id;
                    return res.json({
                        id: createdUser.id,
                        firstName: createdUser.firstName,
                        lastName: createdUser.lastName,
                        email: createdUser.email,
                        lastLoginDate: createdUser.lastLoginDate,
                        role: createdUser.role
                    });
                });
            }
        });

    },

    login: function (req, res) {

        User.findOne({
            email: req.param('email')
        }, function (err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            require('machinepack-passwords').checkPassword({
                passwordAttempt: req.param('password'),
                encryptedPassword: user.encryptedPassword
            }).exec({
                error: function (err){
                    return res.negotiate(err);
                },
                incorrect: function (){
                    return res.notFound();
                },
                success: function (){
                    req.session.userId = user.id;
                    return res.json({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        lastLoginDate: user.lastLoginDate,
                        role: user.role
                    });
                }
            });
        });

    },

    logout: function (req, res) {

        User.findOne(req.session.userId, function (err, user) {
            if (err) return res.negotiate(err);

            if (!user) {
                sails.log.verbose('Session refers to a user who no longer exists.');
                return res.redirect('/login');
            }

            req.session.userId = null;

            return res.redirect('/login');

        });

    },

    isAuthorized: function (req, res) {

        if (!req.session.userId) return res.redirect('/login');

        User.findOne(req.session.userId, function (err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.redirect('/login');
            return res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                lastLoginDate: user.lastLoginDate,
                role: user.role
            });
        });

    }

};

