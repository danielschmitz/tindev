const { Schema, model } = require("mongoose");

const DevSchema = new Schema(
  {
    nome: {
      type: String,
      required: true
    },
    usuario: {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("Dev", DevSchema);
