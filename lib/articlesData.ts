export interface ArticleSection {
  text: string;
  image: string;
  imagePosition: 'left' | 'right';
}

export interface Article {
  id: string;
  month: number; // 1-12
  year: number;
  title: string;
  excerpt: string;
  bannerImage: string;
  sections: ArticleSection[];
}

export const articlesData: Article[] = [
  // 2026 Articles
  {
    id: 'jan-2026',
    month: 1,
    year: 2026,
    title: 'Starting my bachelor project',
    excerpt: 'Kicking off my bachelor project with exciting ideas and plans for the next few months.',
    bannerImage: "/2026/B-01-01.JPG",
    sections: [
      {
        text: 'I am very exited to start my bachelor project this month! ',
        image: "/2026/B-01-01.JPG",
        imagePosition: 'right',
      },
      {
        text: '',
        image: '2026/01-02.JPG',
        imagePosition: 'left',
      },
      {
        text: '',
        image: '2026/01-03.JPG',
        imagePosition: 'right',
      },
    ],
  },
];

export function getArticlesByYear(year: number): Article[] {
  return articlesData.filter(article => article.year === year);
}

export function getUniqueYears(): number[] {
  return Array.from(new Set(articlesData.map(a => a.year))).sort((a, b) => b - a);
}

export function getMonthName(month: number): string {
  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month] || '';
}

export function getLatestArticle(): Article | undefined {
  if (articlesData.length === 0) return undefined;
  return articlesData[0];
}
