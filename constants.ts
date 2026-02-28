
import { ThumbnailItem } from './types';

export const PORTFOLIO_ITEMS: ThumbnailItem[] = [
  { id: '1', title: 'Spiderman Adventure', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Action', description: 'Epic superhero adventure thumbnail', date: '', views: '', subs: '', duration: '' },
  { id: '2', title: 'Mystery Quest', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Adventure', description: 'Mysterious quest thumbnail design', date: '', views: '', subs: '', duration: '' },
  { id: '3', title: 'Battle Royale', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Combat', description: 'Intense battle royale thumbnail', date: '', views: '', subs: '', duration: '' },
  { id: '4', title: 'Survival Challenge', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Survival', description: 'Survival challenge thumbnail', date: '', views: '', subs: '', duration: '' },
  { id: '5', title: 'Smayan Bhai Banner', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Banner', description: 'Custom banner design', date: '', views: '', subs: '', duration: '' },
  { id: '6', title: 'Trading Empire', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Trading', description: 'Roblox trading thumbnail', date: '', views: '', subs: '', duration: '' },
  { id: '7', title: 'Obby Master', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Parkour', description: 'Obby parkour challenge', date: '', views: '', subs: '', duration: '' },
  { id: '8', title: 'Roleplay Story', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Roleplay', description: 'Roleplay story thumbnail', date: '', views: '', subs: '', duration: '' },
  { id: '9', title: 'Tycoon Builder', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Tycoon', description: 'Tycoon building game', date: '', views: '', subs: '', duration: '' },
  { id: '10', title: 'Horror Experience', imageUrl: 'https://res.cloudinary.com/duvswaqcv/image/upload/v1757539264/smayan_bhai_banner_clglls.jpg', category: 'Horror', description: 'Scary horror game thumbnail', date: '', views: '', subs: '', duration: '' },
];

export const ORDER_PACKAGES = [
  {
    name: "Teaser Pack",
    price: "$45",
    description: "Ideal for short-term campaigns and high-intensity testing.",
    features: ["1 Custom Thumbnail", "IMAX Quality Render", "2 Major Revisions", "24h Final Cut"],
    recommended: false
  },
  {
    name: "Blockbuster Series",
    price: "$195",
    description: "The gold standard for consistent channel world-building.",
    features: ["5 High-CTR Designs", "Storyline Continuity", "Unlimited Polish", "Priority Screenings"],
    recommended: true
  },
  {
    name: "Studio Partnership",
    price: "$750",
    description: "For creators building their own cinematic universe.",
    features: ["Unlimited Production", "Director-Level Consulting", "12h Express Render", "Custom Brand Identity"],
    recommended: false
  }
];

export const REVIEWS = [
  {
    name: "Patrick Zeinali",
    role: "Director (7M)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patrick",
    text: "EditIQ is the most creative designer I have worked with! Sometimes as a creator you hit a creative wall and need help getting some ideas, going to EditIQ never fails. His passion for designing is unlike anyone I have met."
  },
  {
    name: "NachoAverageFinds",
    role: "Producer (200K)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nacho",
    text: "Best thumbnail designer in the biz. Seriously do not like working with anyone else. You won't find someone more obsessed with their craft than EditIQ. He just gets it!"
  },
  {
    name: "Jamie Whiffen",
    role: "Creative Consultant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    text: "I'm always recommending EditIQ to people as he produces fantastic thumbnails and actually *cares* about the strategy behind the design, not just what it looks like. Highly recommend!"
  }
];

export const FAQS = [
  { q: "Is the studio currently in production?", a: "Yes! Production lines are open. Reach out via 'Book Now' to secure your slot." },
  { q: "Do you handle the script or just the posters?", a: "I handle the visual direction. I take your script concept and turn it into a blockbuster thumbnail strategy." },
  { q: "What's the render time like?", a: "Usually 24 to 48 hours. Express render available for Studio Partners." },
  { q: "How do you handle A/B Testing?", a: "We monitor box office data (CTR) and offer optimizations to ensure your video hits the top of trending." }
];
