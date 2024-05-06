import connect from "@/utils/database";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export const POST = async (request: Request) => {
  const { title, description, imageUrl, imageDesc } = await request.json();

  await connect();

  const newPost = new Post({
    title,
    description,
    imageUrl,
    imageDesc,
  });

  try {
    await newPost.save();
    return new NextResponse("저장완료", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
