import User from "../models/userModel.js"

// Keep existing signup function...

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide email and password",
      })
    }

    // 2. Find user by email and explicitly select password
    // We need to explicitly select password because we set select: false in our schema
    const user = await User.findOne({ email }).select("+password")

    // 3. Check if user exists and password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect email or password",
      })
    }

    // 4. Remove password from output
    user.password = undefined

    // 5. Send success response
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    })
  }
}

