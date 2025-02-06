const userController = require('../models/userModels');
const bcrypt = require('bcrypt');
exports.registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImage: req.file ? req.file.path : "",
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  };
  
  exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };