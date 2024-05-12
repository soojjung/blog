import Image from "next/image";
import dayjs from "dayjs";
import connect from "@/utils/database";
import Post from "@/models/Post";
import EditArticleForm from "@/components/EditArticleform";

export default async function EditArticle(props) {
  await connect();
  const article = await Post.findById(props.params.id);
  const createdAt = dayjs(article?.createdAt).format("YYYY.MM.DD");

  return (
    <article className="max-w-2xl mx-auto my-6">
      <Image
        src={article?.imageUrl}
        alt={article?.imageDesc}
        width={512}
        height={224}
        priority={true}
        className="max-w-lg mx-auto h-48 w-full object-cover md:h-64 rounded-2xl"
      />

      <EditArticleForm
        _id={article?._id.toString()}
        writer={article?.writer}
        createdAt={createdAt}
        title={article?.title}
        content={article?.content}
      />
    </article>
  );
}
