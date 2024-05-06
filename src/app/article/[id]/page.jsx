import connect from "@/utils/database";
import Post from "@/models/Post";
import Image from "next/image";
import dayjs from "dayjs";

export default async function Article(props) {
  await connect();
  const post = await Post.findById(props.params.id);

  return (
    <article className="max-w-2xl mx-auto my-6">
      <Image
        src={post?.imageUrl}
        alt={post?.imageDesc}
        width={512}
        height={224}
        priority={true}
        className="max-w-lg mx-auto h-48 w-full object-cover md:h-64 rounded-2xl"
      />
      <header className="max-w-lg mx-auto md:max-w-2xl mt-12">
        <h1 className="font-bold text-4xl text-gray-800">{post?.title}</h1>
        <section className="mt-4 text-gray-600 font-normal">
          <p>{post?.writer}</p>
          <time>{dayjs(post?.createdAt).format("YYYY.MM.DD")}</time>
        </section>
      </header>

      <div
        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
        className="max-w-lg mx-auto md:max-w-2xl mt-12 text-[17px] font-light text-gray-600"
      />
    </article>
  );
}
