"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Tiptap from "@/components/Tiptap";

const url = "/api/article/post";

const Article = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { data: session, status: sessionStatus } = useSession();
  const userRole = session?.user?.role;

  useEffect(() => {
    if (sessionStatus !== "authenticated" || userRole !== "admin") {
      alert("글 작성 권한이 없습니다.");
      router.replace("/");
    }
  }, [sessionStatus, router, userRole]);

  const onChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;

    if (!content) {
      setError("내용을 입력해주세요.");
      return;
    }

    const description = content
      .replace(/<[^>]*>/g, "")
      .split(".")
      .slice(0, 2)
      .join(".");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: description,
          imageUrl: "/images/donut.jpeg",
          imageDesc: "donut",
          content: content,
          writer: session.user?.name || "",
        }),
      });

      if (res.status === 400) {
        setError("다시 시도 하세요.");
        alert("에러 발생");
      }
      if (res.status === 200) {
        setError("");
        alert("등록되었습니다.");
        router.prefetch("/");
        setTimeout(() => router.push("/"), 0);
      }
    } catch (error) {
      setError("Error, try again");
      console.error(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="max-w-md mx-auto md:max-w-3xl text-3xl font-bold text-gray-800 my-5">
        새 포스팅
      </h1>
      <div className="max-w-md mx-auto md:max-w-3xl overflow-hidden mt-12">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="title"
            className="text-2xl font-bold text-gray-800 my-4 md:max-w-2xl leading-10"
          >
            제목
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={30}
            className="block w-full rounded-md border-0 p-4 mb-4 text-lg text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6"
          />

          <label
            htmlFor="content"
            className="text-2xl font-bold text-gray-800 my-4 md:max-w-2xl leading-10"
          >
            내용
          </label>
          <Tiptap
            id="content"
            name="content"
            onChange={onChange}
            content={content}
            required
            editable={true}
          />

          <button
            type="submit"
            className="block w-full h-11 mt-8 rounded-lg text-white bg-blue-400 hover:bg-blue-500"
          >
            등록
          </button>
          <p className="block w-full text-left text-[14px] my-4 text-red-500">
            {error && error}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Article;
