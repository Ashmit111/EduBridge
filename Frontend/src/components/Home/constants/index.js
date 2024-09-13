import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../../../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];



const services = [
  {
    title: "Peer-to-Peer Learning",
    icon: web,
  },
  {
    title: "Career Mentorship",
    icon: mobile,
  },
  {
    title: "Flexible Scheduling",
    icon: backend,
  },
  {
    title: "Ratings and Feedback",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Foster Collaboration",
    company_name: "",
    icon: starbucks,
    iconBg: "#383E56",
    date: "",
    points: [
      'Encourage group study sessions, peer-led tutoring, and collaborative projects.',
      'Build a supportive community where students and mentors actively engage and share knowledge.',
      "Promote diverse perspectives and problem-solving through teamwork."
    ],
  },
  {
    title: "Boost Personal and Academic Growth:",
    company_name: "",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "",
    points: [
      'Provide one-on-one tutoring and mentorship to help students tackle challenging subjects.',
      'Improve students confidence, problem-solving, and academic performance.',
      'Enhance mentors leadership and communication skills, preparing students for future career challenges.'
    ],
  },
  {
    title: "Offer Flexibility:",
    company_name: "",
    icon: shopify,
    iconBg: "#383E56",
    date: "",
    points: [
      'Allow mentors to set their own availability and adjust schedules as needed.',
      'Enable students to book sessions at convenient times, accommodating various time zones and workloads.',
      'Provide adaptable learning that fits into student`s and mentor`s busy lives.'
    ]
  },
  {
    title: "Create a Responsive Platform:",
    company_name: "",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "",
    points: [
      'Continuously evolve based on user feedback and experience.',
      'Allow students to leave reviews and mentors to adjust their tutoring approach.',
      'Ensure a user-friendly and effective learning experience that stays relevant over time.']

  },
];

const testimonials = [
  {
    testimonial:
      "This platform is a game-changer! Mentors guide me through academics and career choices, while peers offer great study support.",
    name: "Sara Lee",
    designation: "Graduate",
    company: "St.High UNiversity",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Valuable guidance for research and career planning, plus supportive peer interactions. A must-have for grad students!.",
    name: "Chris Brown",
    designation: "Second Year Student",
    company: "LTCE",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "ake Malan:",
    designation: "Final Year Student",
    company: "Namo school of Graduates",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
