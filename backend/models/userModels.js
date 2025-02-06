import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false, // Don't send password in query results
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  // Only run if password is modified
  if (!this.isModified("password")) return next()

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Instance method to check if password is correct
userSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword)

const User = mongoose.model("User", userSchema)

export default User

