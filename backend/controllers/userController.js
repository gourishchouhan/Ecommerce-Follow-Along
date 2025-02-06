import User from "../models/userModel.js"

export const signup = async (req, res) => {
  try {
    // 1. Extract user data from request body
    const { name, email, password } = req.body

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists with this email",
      })
    }

    // 3. Create new user
    // Password will be automatically encrypted by the pre-save middleware
    const newUser = await User.create({
      name,
      email,
      password,
    })

    // 4. Remove password from output
    newUser.password = undefined

    // 5. Send response
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    })
  }
}

