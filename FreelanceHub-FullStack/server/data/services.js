// data/services.js — In-memory data store

const services = [
  { id: 1,  title: "Professional Logo Design",        category: "Design",      price: 50,  rating: 4.9, reviews: 120, seller: "ArtMaster",   image: "🎨", description: "Modern logo for your brand with unlimited revisions.",       deliveryDays: 3,  level: "Top Rated" },
  { id: 2,  title: "Full Stack Web Development",      category: "Programming", price: 300, rating: 4.8, reviews: 85,  seller: "CodeWizard",  image: "💻", description: "Complete web app built with React and Node.js.",             deliveryDays: 7,  level: "Pro" },
  { id: 3,  title: "SEO Optimization & Strategy",    category: "Marketing",   price: 120, rating: 4.7, reviews: 200, seller: "RankBooster", image: "📈", description: "Full SEO audit and strategy for top Google rankings.",      deliveryDays: 5,  level: "Top Rated" },
  { id: 4,  title: "Professional Video Editing",     category: "Video",       price: 80,  rating: 4.6, reviews: 95,  seller: "EditPro",     image: "🎬", description: "Color grading, transitions, and effects for your videos.",  deliveryDays: 4,  level: "Level 2" },
  { id: 5,  title: "Content Writing & Copywriting",  category: "Writing",     price: 40,  rating: 4.8, reviews: 310, seller: "WordSmith",   image: "✍️", description: "SEO-friendly content for your website, blog, or marketing.", deliveryDays: 2,  level: "Top Rated" },
  { id: 6,  title: "Social Media Management",        category: "Marketing",   price: 150, rating: 4.5, reviews: 67,  seller: "SocialGuru",  image: "📱", description: "Manage your accounts and grow your audience organically.",   deliveryDays: 30, level: "Pro" },
  { id: 7,  title: "UI/UX Design & Prototyping",    category: "Design",      price: 200, rating: 4.9, reviews: 143, seller: "DesignElite", image: "🖌️", description: "Beautiful interfaces and interactive prototypes in Figma.",  deliveryDays: 6,  level: "Top Rated" },
  { id: 8,  title: "Mobile App Development",         category: "Programming", price: 500, rating: 4.7, reviews: 52,  seller: "AppBuilder",  image: "📲", description: "Cross-platform iOS & Android app using React Native.",      deliveryDays: 14, level: "Pro" },
  { id: 9,  title: "Voice Over Recording",           category: "Audio",       price: 60,  rating: 4.8, reviews: 178, seller: "VoiceAce",    image: "🎙️", description: "Professional voice over for videos, ads, or podcasts.",     deliveryDays: 1,  level: "Level 2" },
  { id: 10, title: "WordPress Website Setup",        category: "Programming", price: 90,  rating: 4.6, reviews: 230, seller: "WPExpert",    image: "🌐", description: "Complete WordPress site configured with a premium theme.",   deliveryDays: 3,  level: "Top Rated" },
  { id: 11, title: "Data Analysis & Visualization",  category: "Data",        price: 180, rating: 4.7, reviews: 44,  seller: "DataNinja",   image: "📊", description: "Stunning dashboards and visualizations from your data.",    deliveryDays: 5,  level: "Pro" },
  { id: 12, title: "Illustration & Character Design",category: "Design",      price: 110, rating: 4.9, reviews: 89,  seller: "IllustroArt", image: "🖼️", description: "Custom illustrations and character designs for any project.", deliveryDays: 7,  level: "Top Rated" }
];

let savedServices = [];
let hiredServices = [];

module.exports = { services, savedServices, hiredServices };
