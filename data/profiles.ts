
export type Profile = {
  id: number;
  name: string;
  age: number;
  photo: string;
  bio: string;
  location: string;
  interests: string[];
  likedYou: boolean;
};

export const profiles: Profile[] = [
  { id: 1, name: "Aarohi", age: 22, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800", bio: "Coffee lover, travel enthusiast and always looking for new adventures.", location: "Udaipur", interests: ["Travel", "Music", "Photography"], likedYou: true },
  { id: 2, name: "Riya", age: 21, photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800", bio: "Books, sunsets and meaningful conversations.", location: "Jaipur", interests: ["Reading", "Art", "Movies"], likedYou: false },
  { id: 3, name: "Ananya", age: 23, photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800", bio: "Exploring new places and collecting memories.", location: "Delhi", interests: ["Travel", "Food", "Dance"], likedYou: true },
  { id: 4, name: "Meera", age: 22, photo: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800", bio: "Music is my love language.", location: "Mumbai", interests: ["Music", "Fashion", "Coffee"], likedYou: false },
  { id: 5, name: "Ishita", age: 24, photo: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800", bio: "Dream big, laugh often and travel whenever possible.", location: "Pune", interests: ["Fitness", "Travel", "Nature"], likedYou: true },
  { id: 6, name: "Kavya", age: 21, photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800", bio: "Artist by heart, explorer by nature.", location: "Ahmedabad", interests: ["Painting", "Art", "Music"], likedYou: false },
  { id: 7, name: "Sana", age: 22, photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800", bio: "Finding happiness in little things.", location: "Bangalore", interests: ["Cooking", "Movies", "Travel"], likedYou: false },
  { id: 8, name: "Diya", age: 23, photo: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=800", bio: "Weekend adventures and weekday dreams.", location: "Udaipur", interests: ["Hiking", "Photography", "Food"], likedYou: true },
  { id: 9, name: "Naina", age: 22, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800", bio: "Always curious, always learning.", location: "Jaipur", interests: ["Technology", "Books", "Coffee"], likedYou: false },
  { id: 10, name: "Pihu", age: 21, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800", bio: "Dancing through life one song at a time.", location: "Indore", interests: ["Dance", "Music", "Fitness"], likedYou: true },
  { id: 11, name: "Tara", age: 24, photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800", bio: "Nature lover and chai enthusiast.", location: "Kota", interests: ["Nature", "Reading", "Travel"], likedYou: false },
  { id: 12, name: "Myra", age: 22, photo: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=800", bio: "Making every moment count.", location: "Delhi", interests: ["Movies", "Fashion", "Art"], likedYou: false },
  { id: 13, name: "Kiara", age: 23, photo: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=800", bio: "Good food and better company.", location: "Mumbai", interests: ["Food", "Cooking", "Travel"], likedYou: true },
  { id: 14, name: "Avni", age: 21, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800", bio: "Living life with curiosity.", location: "Bhopal", interests: ["Books", "Music", "Technology"], likedYou: false },
  { id: 15, name: "Sara", age: 24, photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800", bio: "Adventure is always a good idea.", location: "Goa", interests: ["Beach", "Travel", "Photography"], likedYou: false },
  { id: 16, name: "Aditi", age: 22, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800", bio: "Student by day, foodie by night.", location: "Udaipur", interests: ["Food", "Movies", "Coffee"], likedYou: false },
  { id: 17, name: "Mahi", age: 23, photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800", bio: "I believe in spontaneous plans.", location: "Surat", interests: ["Travel", "Dance", "Art"], likedYou: true },
  { id: 18, name: "Zoya", age: 21, photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800", bio: "Music, books and midnight conversations.", location: "Lucknow", interests: ["Music", "Reading", "Movies"], likedYou: false },
  { id: 19, name: "Radhika", age: 24, photo: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800", bio: "Creating memories everywhere I go.", location: "Chandigarh", interests: ["Fashion", "Travel", "Fitness"], likedYou: false },
  { id: 20, name: "Ira", age: 22, photo: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800", bio: "Sunshine mixed with a little creativity.", location: "Jodhpur", interests: ["Painting", "Nature", "Coffee"], likedYou: true },
  { id: 21, name: "Simran", age: 23, photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800", bio: "A little bit of everything.", location: "Amritsar", interests: ["Cooking", "Dance", "Travel"], likedYou: false },
  { id: 22, name: "Prisha", age: 21, photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800", bio: "Finding stories in everyday life.", location: "Nagpur", interests: ["Photography", "Books", "Art"], likedYou: false },
  { id: 23, name: "Aisha", age: 24, photo: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=800", bio: "Always ready for a road trip.", location: "Nashik", interests: ["Travel", "Music", "Nature"], likedYou: true },
  { id: 24, name: "Vanya", age: 22, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800", bio: "Tech enthusiast with a creative side.", location: "Hyderabad", interests: ["Technology", "Gaming", "Movies"], likedYou: false },
  { id: 25, name: "Reva", age: 23, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800", bio: "Collecting moments, not things.", location: "Kochi", interests: ["Beach", "Photography", "Food"], likedYou: false },
  { id: 26, name: "Sia", age: 21, photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800", bio: "Dancing is my happy place.", location: "Jaipur", interests: ["Dance", "Fitness", "Music"], likedYou: true },
  { id: 27, name: "Tanvi", age: 24, photo: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=800", bio: "A curious mind and a warm heart.", location: "Delhi", interests: ["Books", "Coffee", "Travel"], likedYou: false },
  { id: 28, name: "Nisha", age: 22, photo: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=800", bio: "Life tastes better with good food.", location: "Udaipur", interests: ["Cooking", "Food", "Movies"], likedYou: false },
  { id: 29, name: "Rhea", age: 23, photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800", bio: "Explorer of places and ideas.", location: "Bangalore", interests: ["Technology", "Travel", "Art"], likedYou: true },
  { id: 30, name: "Navya", age: 21, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800", bio: "Just here for genuine connections.", location: "Pune", interests: ["Music", "Nature", "Reading"], likedYou: false },
];
