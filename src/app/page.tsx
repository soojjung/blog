import Image from "next/image";
import { postList } from "@/constants";

export default function Home() {
  return (
    <div>
      <h1 className="max-w-md mx-auto text-3xl font-bold text-gray-800 my-4 md:max-w-2xl">
        최근 포스팅
      </h1>
      {postList.map((item, index) => {
        return (
          <div
            key={`postList_${index}`}
            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-16"
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
                <h2 className="text-2xl font-bold mb-2 leading-tight text-gray-800 ">
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
