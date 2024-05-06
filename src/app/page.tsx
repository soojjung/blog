import Link from "next/link";
import Image from "next/image";
import connect from "@/utils/database";
import Post from "@/models/Post";

export default async function Home() {
  await connect();
  const result = await Post.find({}).sort({ createdAt: -1 });

  return (
    <div>
      <h1 className="max-w-md mx-auto md:max-w-3xl text-3xl font-bold text-gray-800 my-4">
        최근 포스팅
      </h1>
      {result.slice(0, 3).map((item, index) => {
        return (
          <div
            key={`recent_post_list_${index}`}
            className="max-w-md mx-auto md:max-w-3xl bg-white rounded-xl shadow-md overflow-hidden mt-16 hover: cursor-pointer group"
          >
            <Link href="/article/[id]" as={`/article/${item._id}`}>
              <article className="md:flex">
                <picture className="md:shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageDesc}
                    width={196}
                    height={196}
                    priority={true}
                    className="h-48 w-full object-cover md:h-full md:w-48"
                  />
                </picture>
                <section className="p-8">
                  <h2 className="text-2xl font-bold mb-2 leading-tight text-gray-700 group-hover:text-gray-950">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                  <p className="text-gray-400 mt-2">{item.updateDt}</p>
                </section>
              </article>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
