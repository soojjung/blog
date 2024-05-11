import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: [
        function (password) {
          return password && password.length >= 8;
        },
        "비밀번호는 최소 8글자로 입력해주세요.",
      ],
    },
    role: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
