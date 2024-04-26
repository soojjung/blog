import Image from "next/image";
import { recentPostList } from "@/constants";

export default function Home() {
  return (
    <div>
      <h1 className="max-w-md mx-auto text-3xl font-bold text-gray-800 my-4 md:max-w-2xl">
        최근 포스팅
      </h1>
      {recentPostList.map((item, index) => {
        return (
          <div
            key={`recentPostList_${index}`}
            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-16 hover: cursor-pointer group"
          >
            <div className="md:flex">
              <div className="md:shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  width={196}
                  height={196}
                  priority={true}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2 leading-tight text-gray-700 group-hover:text-gray-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <p className="text-gray-400 mt-2">{item.date}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
