"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { registerFormInputs } from "@/constants/registerForm";

const url = "/api/auth/register"; // 1. 이 url로 post 요청이 간다.

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;

    if (!isValidEmail(email)) {
      setError("이메일을 확인해주세요.");
      return;
    }

    if (!password || password.length < 8) {
      setError("비밀번호는 최소 8글자로 입력해주세요.");
      return;
    }

    if (confirmPassword !== password) {
      setError("비밀번호를 다시 확인해주세요.");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("The email already in use");
        alert("이미 가입된 회원입니다. 로그인 화면으로 이동하시겠습니까?");
        router.push("/login");
      }
      if (res.status === 200) {
        setError("");
        alert("회원가입 성공! 로그인 화면으로 이동합니다.");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.error(error);
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className="max-w-md mx-auto">
        <div>
          {/* <Image
            src="/images/_birthday_cake.jpeg"
            alt="hourglass"
            width={120}
            height={120}
            priority={true}
            className="mx-auto rounded-2xl "
          /> */}
          <h1 className="max-w-md mx-auto text-3xl text-center font-bold text-gray-800 my-6 md:max-w-2xl">
            Sign up on our website
          </h1>

          <p className="text-sm leading-6 text-center font-medium text-gray-500 mb-4">
            Already have an account?&nbsp;
            <Link href={"/login"}>
              <span className="text-blue-500 underline">Login</span>
            </Link>
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            {registerFormInputs.map((item, index) => (
              <div
                className="mb-2"
                key={`register_form_input_${item.id}_${index}`}
              >
                <label
                  htmlFor={item.id}
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  {item.label}
                </label>
                <div className="mt-2">
                  <input
                    id={item.id}
                    name={item.id}
                    type={item.type}
                    required={item.required}
                    className="block w-full rounded-md border-0 p-2 py-1.5 text-[15px] text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="block w-full h-11 mt-7 rounded-lg text-white bg-blue-400 hover:bg-blue-500"
              >
                회원가입
              </button>

              <p className="block w-full text-left text-[14px] my-4 text-red-500">
                {error && error}
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default RegisterPage;
