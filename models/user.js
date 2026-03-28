const mongoose = require('mongoose');
const { z } = require('zod');

// Mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
});

const User = mongoose.model('User', userSchema);

// Zod validation
function validateUser(user) {
  const schema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email().min(5).max(250),
    password: z.string().min(5).max(250),
  });

  return schema.safeParse(user);
}

exports.User = User;
exports.validate = validateUser;