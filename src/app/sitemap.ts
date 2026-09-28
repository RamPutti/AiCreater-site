import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creatorai.studio';

  const routes = [
    '',
    '/about',
    '/features',
    '/ai-tools',
    '/pricing',
    '/resources',
    '/contact',
    '/faq',
    '/login',
    '/signup',
    '/dashboard',
    '/projects',
    '/tools',
    '/tools/thumbnail',
    '/tools/script',
    '/tools/transcript',
    '/tools/prompt',
    '/tools/metadata',
    '/calendar',
    '/analytics',
    '/settings',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
