const User = require('../models/userModels');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      status: 'success',
      data: { user }
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: { user }
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};