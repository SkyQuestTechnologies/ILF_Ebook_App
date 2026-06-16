export type Book = {
  slug: string;
  title: string;
  description: string;
  author: string;
  category: string;
  featured: boolean;
  free: boolean;
  price: number;
};

export const books: Book[] = [
  { slug: "school-visit",        title: "School Visit Free Ebook",        description: "A free sample ebook for students and families.",              author: "ILF Team",        category: "Education",          featured: true,  free: true,  price: 0    },
  { slug: "eco-warriors",        title: "Eco Warriors",                   description: "A student-friendly ebook about environmental action.",        author: "Jane Green",      category: "Fiction",            featured: false, free: true,  price: 0    },
  { slug: "galactic-frontiers",  title: "Galactic Frontiers",             description: "A thrilling premium sci-fi adventure.",                       author: "A. Spacewriter",  category: "Fiction",            featured: true,  free: false, price: 9.99 },
  { slug: "green-revolution",    title: "The Green Revolution",           description: "Insights into modern sustainability.",                        author: "Dr. Leaf",        category: "Nonfiction",         featured: false, free: false, price: 7.99 },
  { slug: "math-mastery",        title: "Math Mastery",                   description: "Unlock your math potential with proven techniques.",          author: "Prof. Numbers",   category: "Education",          featured: true,  free: false, price: 8.99 },
  { slug: "career-boost",        title: "Career Boost",                   description: "Strategies for career advancement and job success.",          author: "C. Mentor",       category: "Career",             featured: false, free: true,  price: 0    },
  { slug: "financial-freedom",   title: "Financial Freedom",              description: "A guide to financial literacy for students.",                 author: "M. Moneywise",    category: "Financial Literacy", featured: true,  free: false, price: 9.99 },
  { slug: "entrepreneur-mindset",title: "Entrepreneur Mindset",           description: "Think like an entrepreneur from day one.",                   author: "E. Startup",      category: "Entrepreneurship",   featured: false, free: false, price: 6.99 },
  { slug: "student-success",     title: "Student Success",                description: "Habits of high-achieving students worldwide.",               author: "S. Achiever",     category: "Student Success",    featured: true,  free: true,  price: 0    },
  { slug: "writing-wizard",      title: "Writing Wizard",                 description: "Master the art of writing essays and reports.",              author: "P. Penman",       category: "Education",          featured: false, free: true,  price: 0    },
  { slug: "ultimate-guide",      title: "The Ultimate Guide to Success",  description: "Your roadmap to personal and academic success.",             author: "A. Winner",       category: "Student Success",    featured: true,  free: false, price: 11.99},
  ...Array.from({ length: 20 }, (_, i) => {
    const idx = i + 1;
    const categories = ["Fiction","Nonfiction","Education","Career","Financial Literacy","Entrepreneurship","Student Success"] as const;
    return {
      slug: `demo-book-${idx}`,
      title: `Demo Book Title ${idx}`,
      description: `A curated read covering key concepts for modern students — book ${idx} of the series.`,
      author: `Author ${idx}`,
      category: categories[idx % categories.length],
      featured: idx % 7 === 0,
      free: idx % 3 !== 0,
      price: idx % 3 === 0 ? 7.99 : 0,
    };
  }),
];
