import Link from "next/link";
import Image from "next/image";

const Topbar = () => {
  return (
    <nav className="py-5 flex justify-between items-center">
      <Link href={"/"}>
        <Image
          src="/images/hourglass.jpg"
          alt="home"
          width={48}
          height={48}
          className="rounded-full"
        />
      </Link>
      <div>
        <ul></ul>
        <ul className="flex items-center">
          <li className="py-3 px-4 rounded text-gray-500 hover:text-gray-600 hover:bg-gray-50 hover:cursor-pointer">
            <Link href={"/profile"}>
              <span>프로필</span>
            </Link>
          </li>
          <li className="py-3 px-4 rounded text-gray-500 hover:text-gray-600 hover:bg-gray-50 hover:cursor-pointer">
            <Link href={"/blog"}>
              <span>블로그</span>
            </Link>
          </li>
          <li>
            <button className="py-2 px-4 rounded ml-2 text-white bg-rose-100 hover:bg-rose-200">
              로그인
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Topbar;
