import { Skill, Project, EducationItem, CertificationItem } from './types';

export const personalInfo = {
  name: 'Hariharan RG',
  title: 'B.Tech Artificial Intelligence & Data Science Student',
  shortIntro: 'Passionate about Java, Python, C++, Web Development, and Artificial Intelligence. I enjoy building practical applications, solving real-world problems, and continuously improving my technical skills.',
  aboutMe: 'I am a highly motivated B.Tech student in Artificial Intelligence and Data Science at J.N.N Institute of Engineering. My academic journey has fueled a deep passion for software development and artificial intelligence. I love exploring emerging technologies, designing efficient algorithms, and engineering systems that bridge the gap between complex data and intuitive user experiences. With a strong foundation in Object-Oriented Programming, data structures, and database systems, I am eager to apply my skills to real-world projects and drive impact through continuous learning and collaboration.',
  avatarUrl: '',
  email: 'hariharangopinath03@gmail.com',
  phone: '+91 7904568515',
  linkedin: 'https://www.linkedin.com/in/hariharan-gopinath-2b12ab39a',
  github: 'https://github.com/hariharan-030708',
};

export const skills: Skill[] = [
  // Programming Languages
  { name: 'Java', category: 'languages', iconName: 'Coffee' },
  { name: 'Python', category: 'languages', iconName: 'FileCode' },
  { name: 'C++', category: 'languages', iconName: 'Binary' },
  { name: 'HTML', category: 'languages', iconName: 'Layout' },
  { name: 'CSS', category: 'languages', iconName: 'Palette' },
  { name: 'MySQL', category: 'languages', iconName: 'Database' },

  // Core Concepts
  { name: 'Object-Oriented Programming (OOP)', category: 'concepts', iconName: 'Layers' },
  { name: 'Data Structures & Algorithms', category: 'concepts', iconName: 'Network' },
  { name: 'Problem Solving', category: 'concepts', iconName: 'ShieldAlert' },
  { name: 'Exception Handling', category: 'concepts', iconName: 'AlertTriangle' },
  { name: 'File Handling', category: 'concepts', iconName: 'FileText' },
  { name: 'Exploratory Data Analysis', category: 'concepts', iconName: 'BarChart2' },
  { name: 'Machine Learning Fundamentals', category: 'concepts', iconName: 'Brain' },
  { name: 'Data Science', category: 'concepts', iconName: 'PieChart' },
  { name: 'Neural Networks', category: 'concepts', iconName: 'GitMerge' },
  { name: 'LLMs', category: 'concepts', iconName: 'Sparkles' },
  { name: 'APIs', category: 'concepts', iconName: 'Globe' },
  { name: 'Database Management Systems', category: 'concepts', iconName: 'Database' },

  // Mathematics
  { name: 'Linear Algebra', category: 'mathematics', iconName: 'Grid' },
  { name: 'Discrete Mathematics', category: 'mathematics', iconName: 'Network' },
  { name: 'Integral & Differential Calculus', category: 'mathematics', iconName: 'Calculator' },
  { name: 'Statistics & Probability', category: 'mathematics', iconName: 'BarChart3' },
  { name: 'Vector Algebra', category: 'mathematics', iconName: 'Compass' },
  { name: 'Trigonometry', category: 'mathematics', iconName: 'Triangle' },
  { name: 'Coordinate Geometry', category: 'mathematics', iconName: 'Crosshair' },

  // Tools
  { name: 'Git', category: 'tools', iconName: 'GitBranch' },
  { name: 'GitHub', category: 'tools', iconName: 'Github' },
  { name: 'VS Code', category: 'tools', iconName: 'Code' },
  { name: 'ChatGPT', category: 'tools', iconName: 'Bot' },
  { name: 'Gemini', category: 'tools', iconName: 'Sparkles' },
  { name: 'Perplexity', category: 'tools', iconName: 'Search' },
  { name: 'Antigravity', category: 'tools', iconName: 'Rocket' },
  { name: 'AI Studio', category: 'tools', iconName: 'Cpu' },
  { name: 'Claude', category: 'tools', iconName: 'Brain' },
  { name: 'Deployment Tools', category: 'tools', iconName: 'Server' },
  { name: 'DALL-E', category: 'tools', iconName: 'Palette' },

  // Soft Skills
  { name: 'Creative Thinking', category: 'softskills', iconName: 'Lightbulb' },
  { name: 'Time Management', category: 'softskills', iconName: 'Clock' },
  { name: 'Active Listening', category: 'softskills', iconName: 'Headphones' },
  { name: 'Leadership', category: 'softskills', iconName: 'Crown' },
  { name: 'Decision Making', category: 'softskills', iconName: 'Compass' },
  { name: 'Teamwork', category: 'softskills', iconName: 'Users' },
  { name: 'Critical Thinking', category: 'softskills', iconName: 'BrainCircuit' },
  { name: 'Adaptability', category: 'softskills', iconName: 'RefreshCw' },
];

export const projects: Project[] = [
  {
    title: 'Personal Portfolio Website',
    description: 'An interactive, fully responsive personal portfolio designed using HTML, CSS, React, and Tailwind. Employs a stunning Claymorphism (Soft UI) aesthetic with smooth scroll animations, rich content filtering, and responsive structures.',
    technologies: ['React', 'Tailwind CSS', 'Motion', 'Vite'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
    githubUrl: 'https://github.com/hariharan-rg/portfolio',
    liveUrl: '#',
  },
  {
    title: 'Inamingos foundation Awareness Website',
    description: 'An awareness and community outreach web platform created for the Inamingos Foundation. Designed with responsive layouts, engaging cause details, and accessible call-to-action components to raise public awareness and drive community involvement.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600&auto=format&fit=crop',
    githubUrl: 'https://github.com/hariharan-030708/inamingos-awareness',
    liveUrl: 'https://hariharan-030708.github.io/inamingos-awareness/',
  },
];

export const education: EducationItem[] = [
  {
    institution: 'J.N.N Institute of Engineering (J.N.N.I.E)',
    degree: 'B.Tech – Artificial Intelligence & Data Science',
    timeline: '2025 – 2029 (Ongoing)',
    details: [
      'Currently pursuing B.Tech in Artificial Intelligence & Data Science (AIDS) for the 2025 - 2029 batch.',
      'Secured an impressive CGPA of 8.27 in the first year of college.',
      'Focusing on Machine Learning models, Neural Networks, and Database Systems.',
      'Active participant in coding hackathons, technical symposiums, and hands-on laboratory structures.',
    ],
  },
  {
    institution: 'Higher Secondary Education (Grade 12)',
    degree: 'Higher Secondary Certificate (HSC) – Grade 12',
    timeline: '2024 – 2025',
    details: [
      'Scored an impressive HSC score of 90.83% in Grade 12 during the academic year 2024 - 2025.',
      'Strengthened core academic foundations in Mathematics, Physics, and Computer Science.',
    ],
  },
  {
    institution: 'Higher Secondary Education (Grade 11)',
    degree: 'Higher Secondary Course – Grade 11',
    timeline: '2023 – 2024',
    details: [
      'Scored 84.8% in Grade 11 during the academic year 2023 - 2024.',
      'Built a solid foundation in core higher secondary sciences, mathematics, and computer science.',
    ],
  },
  {
    institution: 'Secondary School Education (Grade 10)',
    degree: 'Secondary School Leaving Certificate (SSLC) – Grade 10',
    timeline: '2022 – 2023',
    details: [
      'Scored a stellar SSLC score of 93.5% in Grade 10 during the academic year 2022 - 2023.',
      'Exhibited comprehensive excellence across secondary disciplines and foundational sciences.',
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'Java SE Programming Professional',
    issuer: 'Oracle Academy / Coursera',
    date: 'Expected Dec 2026',
  },
  {
    title: 'Introduction to Artificial Intelligence & Machine Learning',
    issuer: 'Google Cloud Training',
    date: 'Expected Oct 2026',
  },
];
