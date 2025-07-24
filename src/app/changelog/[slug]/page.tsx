import { getChangelogs } from '@/api/changelogs';

import { Changelog } from '@/types/changelog';

interface ChangelogProps {
  params: { slug: string }
}

export default async function ChangelogPage({ params }: ChangelogProps) {
  const { slug } = await params;
  const changelogsData = await getChangelogs();

  const post = changelogsData.find((p:Changelog) => p.slug === slug);
  
  return (
    <main>
      {post 
        ? (
          <section className="section-changelog section">
            <div className="container flex justify-center">
              <div className="content flex flex-col items-center w-full max-w-[700px]">

                <h1 className="title text-center">
                  {post.title}
                </h1>

                <p className="text-xs text-center mt-2 text-(--gray-4)">
                  {post.created_at}
                </p>

                {post.content1 &&
                  <div className="text-base text-left text-white mt-12">
                    {post.content1}
                  </div>
                }

                {post.image_src &&
                  <img className="w-full mt-12 object-contain" src={post.image_src} alt={post.title} />
                }

                {post.content2 &&
                  <div className="text-base text-left text-white mt-12">
                    {post.content2}
                  </div>
                }

              </div>
            </div>
          </section>
        )
        : (
          <div className="section-not-found section">
            <div className="container flex flex-col items-center">

              <h1 className="title text-center">
                ❗ 404
              </h1>

              <p className="text-base text-center mt-6 text-(--gray-4)">
                Not found.
              </p>

            </div>
          </div>
        )
      }
    </main>
  );
}