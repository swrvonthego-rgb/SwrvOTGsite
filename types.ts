export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Question {
  id: string;
  category: string;
  text: string;
  context: string;
  options?: string[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}