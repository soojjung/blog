import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import connect from "@/utils/database";
import Post from "@/models/Post";

export default async function Home() {
  await connect();
  const result = await Post.find({}).sort({ createdAt: -1 }); // -1 최근순

  return (
    <div>
      <h1 className="max-w-md mx-auto md:max-w-3xl text-3xl font-bold text-gray-800 my-5">
        최근 포스팅
      </h1>
      {result.slice(0, 3).map((item, index) => {
        return (
          <div
            key={`recent_post_list_${index}`}
            className="max-w-md mx-auto md:max-w-3xl bg-white rounded-xl shadow-md overflow-hidden mt-16 first-of-type:mt-12 hover: cursor-pointer group"
          >
            <Link href="/article/[id]" as={`/article/${item._id}`}>
              <article className="md:flex">
                <picture className="md:shrink-0 h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageDesc}
                    width={192}
                    height={192}
                    priority={true}
                    className="h-48 w-full object-cover md:h-full md:w-48"
                  />
                </picture>
                <section className="p-8 md:h-48 w-full">
                  <h2 className="text-3xl font-bold mb-3 leading-tight text-gray-700 group-hover:text-gray-950">
                    {item.title}
                  </h2>
                  <p className="mb-3 md:h-12 text-gray-600 truncate-2-lines">
                    {item.description}
                  </p>
                  <time className="text-gray-400 mt-2">
                    {dayjs(item?.createdAt).format("YYYY.MM.DD")}
                  </time>
                </section>
              </article>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
