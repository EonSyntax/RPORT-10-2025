import {
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Rocket,
  Heart,
  Coffee,
  BookOpen,
  Zap,
  Database,
  Server,
  Cloud,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

import PROJECT_IMG_1 from "../assets/images/1.png";
import PROJECT_IMG_2 from "../assets/images/2.png";
import PROJECT_IMG_3 from "../assets/images/3.png";
import PROJECT_IMG_4 from "../assets/images/4.png";
import PROJECT_IMG_5 from "../assets/images/5.png";
import PROJECT_IMG_6 from "../assets/images/6.png";
import PROJECT_IMG_7 from "../assets/images/7.png";
import { desc, title } from "framer-motion/client";
import { color, number } from "framer-motion";

export const SKILLS_CATEGORY = [
  {
    title: "Frontend",
    icon: Code2,
    description: "Building responsive and interactive user interfaces.",
    skills: [
      { name: "React", level: 95, color: "bg-blue-500" },
      { name: "JavaScript", level: 90, color: "bg-yellow-500" },
      { name: "TypeScript", level: 85, color: "bg-blue-700" },
      { name: "HTML5", level: 95, color: "bg-orange-500" },
      { name: "Tailwind CSS", level: 85, color: "bg-teal-500" },
    ],
  },
  {
    title: "Backend",
    icon: Database,
    description: "Creating robust server-side applications and APIs.",
    skills: [
      { name: "Node.js", level: 90, color: "bg-green-500" },
      { name: "Express", level: 85, color: "bg-gray-500" },
      { name: "MongoDB", level: 80, color: "bg-green-700" },
      { name: "PostgreSQL", level: 75, color: "bg-blue-500" },
      { name: "RESTful APIs", level: 90, color: "bg-purple-500" },
    ],
  },
  {
    title: "Database",
    icon: Database,
    description: "Managing and querying databases effectively.",
    skills: [
      { name: "MongoDB", level: 80, color: "bg-green-700" },
      { name: "PostgreSQL", level: 75, color: "bg-blue-500" },
      { name: "MySQL", level: 70, color: "bg-red-500" },
    ],
  },
  {
    title: "DevOps",
    icon: Cloud,
    description: "Streamlining development and operations for faster delivery.",
    skills: [
      { name: "Docker", level: 85, color: "bg-blue-500" },
      { name: "Kubernetes", level: 80, color: "bg-green-500" },
      { name: "CI/CD", level: 90, color: "bg-purple-500" },
    ],
  },
];

export const TECH_STACK = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "Tailwind CSS",
  "Git",
  "GitHub",
];

export const STATS = [
  { number: "50+", label: "Projects Completed" },
  { number: "5+", label: "Years of Experience" },
  { number: "20+", label: "Technologies Used" },
  { number: "100%", label: "Client Satisfaction" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Project One",
    description: "Description for project one.",
    image: PROJECT_IMG_1,
    tags: ["React", "Node.js"],
    liveUrl: "https://github.com/user/project-one",
    githubUrl: "#",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Description for project two.",
    image: PROJECT_IMG_2,
    tags: ["React", "Node.js"],
    liveUrl: "https://github.com/user/project-two",
    githubUrl: "#",
    featured: true,
    category: "Front End",
  },
  {
    id: 3,
    title: "Project Three",
    description: "Description for project three.",
    image: PROJECT_IMG_3,
    tags: ["React", "Node.js"],
    liveUrl: "https://github.com/user/project-three",
    githubUrl: "#",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 4,
    title: "Project Four",
    description: "Description for project four.",
    image: PROJECT_IMG_4,
    tags: ["React", "Node.js"],
    liveUrl: "https://github.com/user/project-four",
    githubUrl: "#",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 5,
    title: "Project Five",
    description: "Description for project five.",
    image: PROJECT_IMG_5,
    tags: ["React", "Node.js"],
    liveUrl: "https://github.com/user/project-five",
    githubUrl: "#",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 6,
    title: "Project Six",
    description: "Description for project six.",
    image: PROJECT_IMG_6,
    tags: ["React", "Node.js"],
    liveUrl: "https://github.com/user/project-six",
    githubUrl: "#",
    featured: false,
    category: "Back End",
  },
  {
    id: 7,
    title: "Project Seven",
    description: "Description for project seven.",
    image: PROJECT_IMG_7,
    tags: ["React", "Node.js"],
    liveUrl: "https://github.com/user/project-seven",
    githubUrl: "#",
    featured: true,
    category: "Full Stack",
  },
];

export const JOURNEY_STEPS = [
  {
    year: "2023",
    title: "Started Learning Programming",
    company: "Self-Study",
    description:
      "Began my journey into the world of coding and software development.",
    icon: Code2,
    color: "bg-blue-500",
  },
  {
    year: "2024",
    title: "Joined a Coding Bootcamp",
    company: "Tech Academy",
    description: "Intensive training in full-stack development.",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    year: "2025",
    title: "Graduated from University",
    company: "Tech University",
    description: "Earned a degree in Computer Science.",
    icon: GraduationCap,
    color: "bg-yellow-500",
  },
  {
    year: "2026",
    title: "First Job as a Developer",
    company: "Tech Company",
    description: "Began my professional career as a software developer.",
    icon: Rocket,
    color: "bg-red-500",
  },
  {
    year: "2027",
    title: "Promoted to Senior Developer",
    company: "Tech Company",
    description: "Advanced to a senior developer role.",
    icon: Award,
    color: "bg-purple-500",
  },
  {
    year: "2028",
    title: "Started Freelancing",
    company: "Self-Employed",
    description: "Began offering freelance development services.",
    icon: Zap,
    color: "bg-orange-500",
  },
];

export const PASSIONS = [
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "Passionate about leveraging cutting-edge technologies to create innovative solutions that drive progress and efficiency.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "Dedicated to building and supporting inclusive communities through technology and collaboration.",
  },
  {
    icon: Coffee,
    title: "Continuous Learning",
    description:
      "Committed to lifelong learning and staying updated with the latest industry trends and technologies.",
  },
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: FiGithub,
    url: "https://github.com/user",
    color: "hover:text-gray-400",
    bgColor: "hover:bg-gray-800",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://linkedin.com/in/user",
    color: "hover:text-gray-400",
    bgColor: "hover:bg-gray-800",
  },
  {
    name: "Twitter",
    icon: FiTwitter,
    url: "https://twitter.com/user",
    color: "hover:text-gray-400",
    bgColor: "hover:bg-gray-800",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:eonsyntax@gmail.com",
    color: "hover:text-gray-400",
    bgColor: "hover:bg-gray-800",
  },
];

export const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "Ogun-State, Nigeria",
  },
  {
    icon: Mail,
    label: "Email",
    value: "eonsyntax@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 813 378 6763",
  },
];
