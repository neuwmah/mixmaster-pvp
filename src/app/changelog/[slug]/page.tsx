import { changelogData } from '../data';

interface Props {
  params: { slug: string }
}

export default async function ChangelogPage({ params }: Props) {
  const { slug } = await params;

  const post = changelogData.find((p) => p.slug === slug);
  
  return (
    <main>
      {post 
        ? (
          <section className="section-changelog section">
            <div className="container flex justify-center">
              <div className="content flex flex-col items-center w-full max-w-[700px]">

                <h1 className="title text-center">{post.title}</h1>

                <p className="text-xs text-center mt-2 text-(--gray-4)">{post.date}</p>

                <div className="text-base text-center text-white mt-12">{post.content}</div>

              </div>
            </div>
          </section>
        )
        : (
          <div className="section-not-found section">
            <div className="container flex flex-col items-center">

              <h1 className="title text-center">❗ 404</h1>

              <p className="text-base text-center mt-6 text-(--gray-4)">Not found.</p>

            </div>
          </div>
        )
      }
    </main>
  );
}