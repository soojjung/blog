"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Tiptap from "@/components/Tiptap";
import { FcOk, FcEmptyTrash, FcUndo } from "react-icons/fc";

const EditArticleForm = ({
  _id,
  writer,
  createdAt,
  title: originalTitle,
  content: originalContent,
}) => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const userRole = session?.user?.role;

  const [content, setContent] = useState(originalContent);

  useEffect(() => {
    if (sessionStatus !== "authenticated" || userRole !== "admin") {
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
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("/api/article/put", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          title,
          description: "오늘 배운 내용을 간략하게 소개하겠습니다.",
          imageUrl: "/images/donut.jpeg",
          imageDesc: "donut",
          content: content,
          writer: writer || "",
        }),
      });
      if (res.status === 400) {
        alert(res.statusText + ": id가 존재하지 않습니다.");
      }
      if (res.status === 200) {
        alert("수정되었습니다.");
        router.prefetch("/");
        setTimeout(() => router.push("/"), 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async (e) => {
    e.preventDefault();

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const res = await fetch("/api/article/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
          }),
        });
        if (res.status === 400) {
          alert(res.statusText + ": id가 존재하지 않습니다.");
        }
        if (res.status === 200) {
          alert("삭제되었습니다.");
          router.prefetch("/");
          setTimeout(() => router.push("/"), 0);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <header className="max-w-lg mx-auto md:max-w-2xl mt-10">
        <input
          id="title"
          name="title"
          required
          defaultValue={originalTitle}
          className="block w-full rounded-md border-0 p-3 font-bold text-3xl text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
        />

        <section className="mt-8 text-gray-600 font-normal">
          <p>Writer: {writer}</p>
          <time>Date: {createdAt}</time>
        </section>
      </header>

      <section className="max-w-lg mx-auto md:max-w-2xl mt-8 text-[17px] font-light text-gray-900">
        <Tiptap
          id="content"
          name="content"
          content={content}
          onChange={onChange}
          required
          editable={true}
        />
      </section>

      <section className="flex justify-end mt-8">
        <Link
          href={"/article/" + _id}
          className="flex align-middle items-center py-2.5 px-4 mr-4 rounded text-blue-400 border border-blue-400 hover:text-white hover:bg-blue-400"
        >
          <FcUndo size={20} />
          <span className="ml-1">취소하기</span>
        </Link>
        <button
          type="button"
          onClick={onClickDelete}
          className="flex align-middle items-center py-2.5 px-4 mr-4 rounded text-blue-400 border border-blue-400 hover:text-white hover:bg-blue-400"
        >
          <FcEmptyTrash size={20} />
          <span className="ml-1">삭제하기</span>
        </button>
        <button
          type="submit"
          className="flex align-middle items-center py-2.5 px-4 rounded text-blue-400 border border-blue-400 hover:text-white hover:bg-blue-400"
        >
          <FcOk size={20} />
          <span className="ml-1">저장하기</span>
        </button>
      </section>
    </form>
  );
};

export default EditArticleForm;
