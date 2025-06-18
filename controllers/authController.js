import jwt from "jsonwebtoken";

// Helper function to create JWT
const signToken = (id, type) => {
  return jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Helper function to send token response
const createSendToken = (user, statusCode, res, message = "Success") => {
  const token = signToken(user._id, user.constructor.modelName);

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      user,
    },
  });
};

// Helper function to create wallet for new users
const createWallet = async (owner, ownerType) => {
  return await Wallet.create({
    owner: owner._id,
    ownerType,
  });
};
