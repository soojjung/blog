import connect from "@/utils/database";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export const POST = async (request: Request) => {
  const { title, description, imageUrl, imageDesc, content, writer } =
    await request.json();

  await connect();

  const newPost = new Post({
    title,
    description,
    imageUrl,
    imageDesc,
    content,
    writer,
  });

  try {
    await newPost.save();
    return new NextResponse("저장완료", { status: 200 });
  } catch (error: any) {
    console.error(error.errmsg || "Error saving article");
    return NextResponse.json(
      {
        error: error.errmsg || "Error saving article",
      },
      {
        status: 500,
      }
    );
  }
};
