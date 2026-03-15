export type DateIdea = {
  id: number;
  title: string;
  description: string;
  category: 'Spiritual' | 'Active' | 'Relaxing' | 'Foodie';
};

export const dateIdeas: DateIdea[] = [
  {
    id: 1,
    title: "Tahajjud & Tea",
    description: "Wake up together for Tahajjud prayer, followed by a warm cup of tea and a deep conversation before Fajr.",
    category: 'Spiritual'
  },
  {
    id: 2,
    title: "Sunnah Sport Day",
    description: "Go for an archery session or horse riding. These are sports encouraged in the Sunnah and are great for bonding.",
    category: 'Active'
  },
  {
    id: 3,
    title: "Masjid Hopping",
    description: "Visit a beautiful masjid in a nearby city that you've never been to. Pray one of the daily prayers there and explore the local area.",
    category: 'Spiritual'
  },
  {
    id: 4,
    title: "Halal Picnic with a View",
    description: "Pack your favorite halal snacks and head to a scenic spot for a picnic. Discuss your favorite blessings from the week.",
    category: 'Relaxing'
  },
  {
    id: 5,
    title: "Sunnah-Inspired Cooking",
    description: "Cook a meal together using only ingredients mentioned in the Quran or Hadith (e.g., dates, honey, olives, barley, pomegranate).",
    category: 'Foodie'
  },
  {
    id: 6,
    title: "Stargazing & Reflection",
    description: "Find a quiet spot away from city lights. Look at the stars and discuss the verses of the Quran that talk about the creation of the heavens.",
    category: 'Relaxing'
  },
  {
    id: 7,
    title: "Charity Date",
    description: "Spend a few hours volunteering together at a local food bank or orphanage. Helping others is a great way to grow closer.",
    category: 'Spiritual'
  },
  {
    id: 8,
    title: "New Cuisine Quest",
    description: "Find a halal restaurant serving a cuisine you've never tried before (e.g., Ethiopian, Uyghur, or Malaysian).",
    category: 'Foodie'
  },
  {
    id: 9,
    title: "Nature Hike & Dhikr",
    description: "Go for a hike and take turns leading a session of Dhikr (remembrance of Allah) while enjoying the natural beauty.",
    category: 'Active'
  },
  {
    id: 10,
    title: "Islamic Bookstore Browsing",
    description: "Visit an Islamic bookstore. Each of you pick a book for the other to read and discuss later over coffee.",
    category: 'Spiritual'
  }
];
