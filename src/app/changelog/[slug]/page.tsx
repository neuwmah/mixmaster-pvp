import { changelogData } from '../data';

interface Props {
  params: { slug: string }
}

export default async function ChangelogPage({ params }: Props) {
  const { slug } = await params;

  const post = changelogData.find((p) => p.slug === slug);

  if (!post) {
    return <div className="container">Post not found.</div>;
  }

  return (
    <main>
      <section className="section-changelog section">
        <div className="container flex justify-center">
          <div className="content flex flex-col items-center w-full max-w-[700px]">

            <h1 className="title text-center">{post.title}</h1>

            <p className="text-xs text-center mt-2 text-(--gray-4)">{post.date}</p>

            <div className="text-base text-center text-white mt-12">{post.content}</div>

          </div>
        </div>
      </section>
    </main>
  );
}