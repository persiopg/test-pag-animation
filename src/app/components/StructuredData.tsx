import type { NavLink } from '../lib/nav';

interface StructuredDataProps { navLinks: NavLink[] }

export function StructuredData({ navLinks }: StructuredDataProps) {
  const siteUrl = 'https://example.com';

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Persio Godoy',
    jobTitle: 'Desenvolvedor Full-Stack',
    url: siteUrl
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Portfólio Persio Godoy',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Secções Navegáveis',
    itemListElement: navLinks.filter(l => l.hasPage).map((l, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: l.label,
      url: siteUrl + (l.href === '/' ? '' : l.href)
    }))
  };

  const json = [person, webSite, itemList];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
