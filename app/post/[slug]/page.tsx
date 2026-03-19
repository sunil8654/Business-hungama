import ArticlePage from './ArticleClient';

export const dynamicParams = true;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://businesshungama.com/cms/wp-json/wp/v2';
    const slugs: { slug: string }[] = [];
    let page = 1;

    while (page <= 10) {
      const res = await fetch(`${baseUrl}/posts?per_page=100&page=${page}&_fields=slug&_embed=true`, { cache: 'force-cache' });
      if (!res.ok) break;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      
      for (const post of data) {
        slugs.push({ slug: post.slug });
      }
      
      if (data.length < 100) break;
      page++;
    }

    const sampleSlugs = [
      { slug: 'latest-bollywood-news' },
      { slug: 'business-update' },
    ];

    const allSlugs = [...slugs, ...sampleSlugs];
    const unique = new Map(allSlugs.map(s => [s.slug, s]));
    return Array.from(unique.values());
  } catch {
    return [{ slug: 'latest-bollywood-news' }];
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ArticlePage slug={params.slug} />;
}
