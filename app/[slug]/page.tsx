import CategoryPage from './CategoryRootClient';

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://businesshungama.com/cms/wp-json/wp/v2';
    const slugs = [];
    let page = 1;

    while (page <= 20) {
      const res = await fetch(`${baseUrl}/categories?per_page=100&page=${page}&_fields=slug&hide_empty=false`, { cache: 'force-cache' });
      if (!res.ok) break;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      slugs.push(...data.map((c: { slug: string }) => ({ slug: c.slug })));
      if (data.length < 100) break;
      page++;
    }

    const defaultSlugs = [
      { slug: 'business' },
      { slug: 'bollywood' },
      { slug: 'technology' },
      { slug: 'sports' },
      { slug: 'world' },
      { slug: 'economy' },
    ];

    const allSlugs = [...slugs, ...defaultSlugs];
    const unique = new Map(allSlugs.map(s => [s.slug, s]));
    return Array.from(unique.values());
  } catch {
    return [
      { slug: 'business' },
      { slug: 'bollywood' },
      { slug: 'technology' },
    ];
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryPage slug={params.slug} />;
}
