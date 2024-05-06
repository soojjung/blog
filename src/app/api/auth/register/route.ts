import connect from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// 2. 서버는 가입 요청 받으면 DB에 저장해준다.
export const POST = async (request: Request) => {
  const { name, email, password, role } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5); // 5는 암호화정도
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
