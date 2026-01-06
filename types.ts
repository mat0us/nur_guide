
export enum SectionType {
  Patterns = 'patterns',
  Theory = 'theory',
  Websites = 'websites',
  Inspiration = 'inspiration',
  Testing = 'testing'
}

export interface Pattern {
  id: string;
  name: string;
  category: string;
  description: string;
  what: string;
  useWhen: string;
  why: string;
  how: string;
  examples?: string[];
}

export interface Resource {
  name: string;
  focus: string;
  offer: string;
  price: 'Zdarma' | 'Paid' | 'Freemium';
  link: string;
}

export interface Book {
  title: string;
  author: string;
  year: string;
  description: string;
}
