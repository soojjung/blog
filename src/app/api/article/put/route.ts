import connect from "@/utils/database";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export const PUT = async (request: Request) => {
  const { _id, title, content, description, imageUrl, imageDesc, writer } =
    await request.json();

  await connect();

  const update = {
    title,
    content,
    description,
    imageUrl,
    imageDesc,
    writer,
  };

  try {
    if (!_id) {
      return new NextResponse("id가 존재하지 않습니다.", { status: 400 });
    }
    await Post.findByIdAndUpdate(_id, update, { new: true }); // This method finds a document by its ID and updates it in one step. It returns the modified document by default.
    return new NextResponse("수정완료", { status: 200 });
  } catch (error: any) {
    console.error(error.errmsg || "Error editing article");
    return new NextResponse("Error editing article", { status: 500 });
  }
};
