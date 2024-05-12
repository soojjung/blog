import Image from "next/image";
import dayjs from "dayjs";
import connect from "@/utils/database";
import Post from "@/models/Post";
import Tiptap from "@/components/Tiptap";
import UnLock from "@/components/UnLock";

export default async function WriteArticle(props) {
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
        <div className="flex justify-between items-baseline">
          <h1 className="font-bold text-4xl text-gray-800">{post?.title}</h1>
          <UnLock id={props.params.id} />
        </div>

        <section className="mt-8 text-gray-600 font-normal">
          <p>{post?.writer}</p>
          <time>{dayjs(post?.createdAt).format("YYYY.MM.DD")}</time>
        </section>
      </header>

      <section className="max-w-lg mx-auto md:max-w-2xl mt-8 text-[17px] font-light text-gray-900">
        <Tiptap
          id="content"
          name="content"
          content={post?.content}
          required
          editable={false}
        />
      </section>
    </article>
  );
}
