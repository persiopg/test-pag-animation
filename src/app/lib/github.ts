
export interface GithubRepoRaw {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  archived: boolean;
  fork: boolean;
}

export interface ProjectItem {
  title: string;
  description: string;
  image: string; // OpenGraph ou placeholder
  tags: string[];
  link: string;
  stars?: number;
  forks?: number;
  updatedAt?: string;
}

const DEFAULT_PLACEHOLDER = 'https://placehold.co/600x400/0A192F/CCD6F6?text=Repo';

/**
 * Busca repositórios do usuário. Se GITHUB_TOKEN estiver definido, usa header Authorization para aumentar rate limit.
 * Filtra forks e arquivados. Permite limitar quantidade e filtrar por tópico opcional (ex: "portfolio").
 */
export async function fetchGithubRepos(username: string, opts: { limit?: number; topic?: string } = {}): Promise<GithubRepoRaw[]> {
  const { limit = 6, topic } = opts;
  const token = process.env.GITHUB_TOKEN;
  const perPage = Math.min(100, limit * 3); // pegar um buffer para filtrar
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    // Revalidate via Next.js (quando usado em ambiente server). Client fetch ignora.
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}`);
  }
  const data = (await res.json()) as GithubRepoRaw[];
  let filtered = data.filter(r => !r.fork && !r.archived);
  if (topic) {
    filtered = filtered.filter(r => r.topics?.includes(topic));
  }
  return filtered.slice(0, limit);
}

/**
 * Converte dados crus do GitHub para o modelo de projeto usado na UI.
 * Usa OpenGraph do GitHub para gerar uma imagem de preview do repositório.
 */
export function mapRepoToProject(username: string, repo: GithubRepoRaw): ProjectItem {
  const ogImage = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  if (repo.topics) tags.push(...repo.topics.slice(0, 3));
  return {
    title: repo.name,
    description: repo.description || 'Repositório sem descrição.',
    image: ogImage || DEFAULT_PLACEHOLDER,
    tags: Array.from(new Set(tags)).slice(0, 5),
    link: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at
  };
}

export interface ProjectsResponse {
  projects: ProjectItem[];
  from: 'github' | 'fallback';
  error?: string;
}

export async function buildProjectsPayload(username: string, opts: { limit?: number; topic?: string } = {}): Promise<ProjectsResponse> {
  try {
    const repos = await fetchGithubRepos(username, opts);
    const projects = repos.map(r => mapRepoToProject(username, r));
    return { projects, from: 'github' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido ao consultar GitHub';
    return { projects: [], from: 'fallback', error: message };
  }
}
