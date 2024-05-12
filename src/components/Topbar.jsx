import Link from "next/link";
import Image from "next/image";
import LoginComponent from "@/components/Login";

const Topbar = () => {
  return (
    <nav className="py-5 flex justify-between items-center">
      <Link href={"/"}>
        <Image
          src="/images/hourglass.jpg"
          alt="hourglass"
          width={48}
          height={48}
          priority={true}
          className="rounded-full"
        />
      </Link>
      <div>
        <ul></ul>
        <ul className="flex items-center list-none">
          <li className="py-3 px-4 rounded text-gray-500 hover:text-gray-600 hover:bg-gray-50 hover:cursor-pointer">
            <Link href={"/profile"}>
              <span>프로필</span>
            </Link>
          </li>
          <li className="py-3 px-4 rounded text-gray-500 hover:text-gray-600 hover:bg-gray-50 hover:cursor-pointer">
            <Link href={"/article"}>
              <span>블로그</span>
            </Link>
          </li>
          <li>
            <LoginComponent />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Topbar;
