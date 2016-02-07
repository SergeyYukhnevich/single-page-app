/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string',
      required: true
    },
    lastLoginDate: {
      type: 'date',
      defaultsTo: new Date(0)
    },
    role: {
      type: 'string',
      required: true,
      enum: ['admin', 'user'],
      defaultsTo: 'user'
    }
  }
};

