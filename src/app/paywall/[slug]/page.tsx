import { notFound } from "next/navigation";
import PaywallActions from "@/components/paywall/PaywallActions";

// Demo book data fallback (since booksData is not exported as default)
const demoTitles = [
  "Money Habits for Teens", "Startup Blueprint", "Mindset Mastery", "Career Kickstart Guide", "Modern Financial Literacy",
  "The Art of Focus", "Digital Nomad Life", "Science for Curious Minds", "The Lost Expedition", "Creative Writing Toolkit",
  "Healthy Living Essentials", "The Innovator's Playbook", "Everyday Leadership", "The Secret Gardeners", "AI for Everyone",
  "The Great Escape", "Productivity Hacks", "The World of Numbers", "History Unveiled", "The Coding Journey",
  "The Art of Negotiation", "Eco Warriors", "The Storyteller's Path", "Physics in Motion", "The Mindful Parent",
  "The Startup CEO", "The Young Investor", "The Explorer's Diary", "The Science of Sleep", "The Social Media Guide",
  "The Modern Philosopher", "The Wellness Project", "The Digital Classroom", "The Fictional Reality", "The Nonfiction Narrative",
  "The Education Revolution", "The Book of Curiosity", "The Learning Curve", "The Adventure Begins", "The Knowledge Seeker",
  "The Free Thinker", "The Paid Solution", "The Featured Five", "The Balanced Life", "The Growth Mindset",
  "The Reading Habit", "The Future is Now", "The Classic Collection", "The New Age", "The Essential Guide"
];

const demoAuthors = [
  "Jane Doe", "John Smith", "Alex Lee", "Sam Green", "Marie Curie", "Ava Carter", "Liam Brown", "Olivia Wilson", "Noah Miller", "Emma Davis",
  "Mason Clark", "Sophia Lewis", "Logan Walker", "Mia Hall", "Lucas Young", "Charlotte King", "Elijah Wright", "Amelia Scott", "James Turner", "Harper Adams",
  "Benjamin Baker", "Evelyn Nelson", "Henry Perez", "Abigail Roberts", "Sebastian Campbell", "Ella Mitchell", "Jack Carter", "Grace Evans", "Daniel Edwards", "Chloe Rivera",
  "Matthew Cooper", "Scarlett Morgan", "David Reed", "Victoria Cox", "Joseph Bailey", "Penelope Ward", "Samuel Brooks", "Layla Kelly", "Carter Sanders", "Zoey Price",
  "Wyatt Bennett", "Lily Gray", "Julian Hughes", "Hannah Foster", "Levi Simmons", "Nora Butler", "Isaac Barnes", "Ellie Ross", "Gabriel Henderson", "Stella Patterson"
];

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const books = Array.from({ length: 50 }).map((_, i) => {
  let category = ["Fiction", "Nonfiction", "Education"][i % 3];
  let free = i < 20;
  let featured = i < 5;
  const title = demoTitles[i % demoTitles.length] + (i >= demoTitles.length ? ` Vol. ${Math.floor(i / demoTitles.length) + 1}` : "");
  const author = demoAuthors[i % demoAuthors.length];
  return {
    slug: slugify(title),
    title,
    author,
    category,
    featured,
    free,
    cover: "",
    price: 9.99,
  };
});

export default async function PaywallPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug && !b.free);
  if (!book) return notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <div className="h-32 w-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
          <span className="text-5xl text-blue-300">📘</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{book.title}</h1>
        <div className="text-sm text-gray-600 mb-4">by {book.author}</div>
        <div className="text-lg font-semibold text-blue-700 mb-2">${book.price.toFixed(2)}</div>
        <div className="text-gray-700 mb-6 text-center">
          Unlock this ebook and gain lifetime access. Enjoy exclusive content and support the author!
        </div>
        <PaywallActions slug={book.slug} title={book.title} price={book.price} />
      </div>
    </div>
  );
}
