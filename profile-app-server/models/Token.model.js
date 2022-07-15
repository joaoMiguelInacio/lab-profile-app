const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const tokenSchema = new Schema(
  {
    token: {
      type: String,
    }
});

const Token = model("Token", tokenSchema);

module.exports = Token;
