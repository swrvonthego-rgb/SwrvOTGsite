import { Service, Question, NavItem } from './types';

export const SERVICES: Service[] = [
  {
    title: "Artist Development",
    description: "The one-stop shop for your bigger vision. We handle the logistics so you can create the art.",
    icon: "Globe"
  },
  {
    title: "Brand Planning & Infrastructure",
    description: "Establish your foundation. We handle LLC structuring, professional website development, and complete brand blueprints.",
    icon: "Briefcase"
  },
  {
    title: "BYOB Training",
    description: "Fitness & Self-Defense Coaching. Train your body, protect your peace. Visit trainbyob.me.",
    icon: "CheckCircle"
  },
  {
    title: "Authorship",
    description: "Books to guide your journey: 'SWRV In Your Gift' and 'The RoadMap (Blueprint Your Vision)'.",
    icon: "FileText"
  },
  {
    title: "SWRV Talk Podcast",
    description: "Wisdom, motivation, and behind-the-scenes stories from the journey. Tune in to the conversation.",
    icon: "Database"
  },
  {
    title: "Birdsong Method",
    description: "Vocal Course & Coaching. Build confidence, expand your range, and master vocal runs. Your voice is your wings.",
    icon: "Music"
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "THE ECOSYSTEM", href: "#ecosystem" },
  { label: "BYOB TRAINING", href: "https://trainbyob.me" },
  { label: "BIRDSONG METHOD", href: "http://localhost:3000" },
  { label: "BOOKS", href: "#books" },
  { label: "PODCAST", href: "#podcast" },
  { label: "ABOUT ZION", href: "#about" },
];

export const CONSULTATION_QUESTIONS: Question[] = [
  {
    id: "identity",
    category: "Artist Identity",
    text: "What is the core emotion of your current era?",
    context: "We align our visual strategy with the emotional tone of your latest work.",
    options: ["Rebellious & Raw", "Polished & Pop", "Introspective & Deep", "Experimental & Avant-Garde"]
  },
  {
    id: "stage",
    category: "Career Stage",
    text: "Where are you in your journey?",
    context: "Our services scale from independent breakouts to stadium headliners.",
    options: ["Emerging Artist", "National Touring Act", "Global Icon", "Legacy Act"]
  },
  {
    id: "focus",
    category: "Strategic Focus",
    text: "What is the immediate priority?",
    context: "Swrv On The Go helps you navigate roadblocks to hit your next milestone.",
    options: ["Tour Logistics", "Album Rollout", "Rebranding", "Fan Base Expansion"]
  },
  {
    id: "platform",
    category: "Digital Presence",
    text: "Where does your community live?",
    context: "We tailor content strategies to where your fans are most active.",
    options: ["TikTok & Instagram", "Spotify & Apple Music", "YouTube & Vevo", "Discord & Twitch"]
  }
];