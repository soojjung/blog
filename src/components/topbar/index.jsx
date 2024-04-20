import Link from "next/link";
import Image from "next/image";

const Topbar = () => {
  return (
    <header className="py-5 flex justify-between items-center">
      <Link href={"/"}>
        <Image
          src="/images/hourglass.jpg"
          alt="hourglass"
          width={48}
          height={48}
          className="rounded-full"
        />
      </Link>
      <div>
        <Link href={"/profile"}>
          <span className="text-gray-600 hover:text-gray-800" href="#">
            프로필
          </span>
        </Link>
        <Link href={"/blog"}>
          <span className="text-gray-600 hover:text-gray-800 ml-6" href="#">
            블로그
          </span>
        </Link>
        <button className="text-gray-400 py-2 px-4 rounded ml-6 bg-pink-50">
          로그인
        </button>
      </div>
    </header>
  );
};

export default Topbar;
