import connect from "@/utils/database";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export const DELETE = async (request: Request) => {
  const { _id } = await request.json();

  await connect();

  try {
    if (!_id) {
      return new NextResponse("id가 존재하지 않습니다.", { status: 400 });
    }
    await Post.findByIdAndDelete(_id);

    return new NextResponse("삭제완료", { status: 200 });
  } catch (error: any) {
    console.error(error.errmsg || "Error deleting article");
    return new NextResponse("Error deleting article", { status: 500 });
  }
};
