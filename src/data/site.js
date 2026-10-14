// Central place for site-wide information. Edit this file to update your
// channel links, tagline and navigation.

export const SITE = {
  name: "Up Learn Era",
  tagline: "Learn AI, ML & Python by building",
  description:
    "UpLearn Era is a learning hub for B.Tech students — free video tutorials, structured courses, hands-on projects, AI tools and a prompt library, all in one place.",
  youtube: "https://www.youtube.com/@uplearnera",
  email: "uplearnera@gmail.com",
  location: "Online · India",
  since: "2025",
};

export const QUICK_LINKS = [
  ["Home", "/"],
  ["Courses", "/courses"],
  ["Videos", "/videos"],
  ["Projects", "/projects"],
];

// Full navigation used by the sidebar, grouped into sections.
export const NAV_GROUPS = [
  {
    label: "Learn",
    items: [
      { label: "Home", to: "/", icon: "home" },
      { label: "Courses", to: "/courses", icon: "book" },
      { label: "Videos", to: "/videos", icon: "play" },
      { label: "Images", to: "/images", icon: "image" },
    ],
  },
  {
    label: "Build",
    items: [
      { label: "Projects", to: "/projects", icon: "rocket" },
      { label: "AI Tools", to: "/ai-tools", icon: "wrench" },
      { label: "Prompt Library", to: "/prompts", icon: "terminal" },
    ],
  },
  {
    label: "Connect",
    items: [
      { label: "About", to: "/about", icon: "info" },
      { label: "Contact", to: "/contact", icon: "mail" },
    ],
  },
];

export const SOCIALS = [
  { label: "YouTube", icon: "youtube", url: SITE.youtube },
  { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/" },
  { label: "X", icon: "x", url: "https://x.com/" },
];

export const STATS = [
  { value: "60+", label: "Free video tutorials" },
  { value: "15+", label: "Hands-on projects" },
  { value: "8", label: "Learning tracks" },
  { value: "12K+", label: "Community learners" },
];
