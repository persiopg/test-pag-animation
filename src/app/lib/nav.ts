import fs from 'fs';
import path from 'path';

export type NavLink = {
  href: string;
  label: string;
  hasPage: boolean;
  subLinks?: NavLink[];
};

const EXCLUDE = new Set(['components', 'api']);
const isHidden = (dir: string) => dir.startsWith('(') || dir.startsWith('_');

function formatLabel(seg: string) {
  return seg
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function generateNavLinks(baseDir = path.join(process.cwd(), 'src', 'app')): NavLink[] {
  let entries: fs.Dirent[] = [];
  try {
    entries = fs.readdirSync(baseDir, { withFileTypes: true });
  } catch {
    return [];
  }
  const links: NavLink[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (EXCLUDE.has(entry.name) || isHidden(entry.name)) continue;

    const dirPath = path.join(baseDir, entry.name);
    const hasPage = fs.existsSync(path.join(dirPath, 'page.tsx')) || fs.existsSync(path.join(dirPath, 'page.jsx'));

    // subdirectories
    let subLinks: NavLink[] | undefined;
    let subEntries: fs.Dirent[] = [];
    try {
      subEntries = fs.readdirSync(dirPath, { withFileTypes: true });
    } catch { /* ignore */ }
    const filteredSubs = subEntries.filter(d => d.isDirectory() && !EXCLUDE.has(d.name) && !isHidden(d.name));
    if (filteredSubs.length > 0) {
      subLinks = filteredSubs.map(sub => {
        const subPath = path.join(dirPath, sub.name);
        const subHasPage = fs.existsSync(path.join(subPath, 'page.tsx')) || fs.existsSync(path.join(subPath, 'page.jsx'));
        return {
          href: `/${entry.name}/${sub.name}`,
          label: formatLabel(sub.name),
          hasPage: subHasPage
        };
      }).filter(s => s.hasPage);
      if (subLinks.length === 0) subLinks = undefined;
    }

    if (hasPage || subLinks) {
      links.push({
        href: `/${entry.name}`,
        label: formatLabel(entry.name),
        hasPage,
        subLinks
      });
    }
  }

  links.sort((a, b) => a.label.localeCompare(b.label));

  // prepend home
  return [{ href: '/', label: 'Home', hasPage: true, subLinks: [] }, ...links];
}
