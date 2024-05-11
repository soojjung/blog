"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Tiptap from "@/components/Tiptap";

const url = "/api/post";

const Article = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

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

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: "오늘 배운 내용을 간략하게 소개하겠습니다.",
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
        블로그
      </h1>
      <div className="max-w-md mx-auto md:max-w-3xl overflow-hidden mt-16">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="title"
            className="text-xl font-bold text-gray-800 my-4 md:max-w-2xl leading-10"
          >
            글 제목
          </label>
          <input
            id="title"
            name="title"
            required
            className="block w-full rounded-md border-0 p-2 py-1.5 mb-4 text-[15px] text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />

          <label
            htmlFor="content"
            className="text-xl font-bold text-gray-800 my-4 md:max-w-2xl leading-10"
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
            className="rounded-md border min-h-[150px] border-input disabled:cursor-not-allowed disabled:opacity-50"
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
