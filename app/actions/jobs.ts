import { Job } from '@/types/job';

// Extend the Job interface to include additional fields used in our mock data
interface ExtendedJob extends Job {
  applicationDeadline?: string;
  skills?: string[];
}

// Mock data for development
const mockJobs: ExtendedJob[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    postedDate: '2023-06-15',
    description: 'We are looking for an experienced Frontend Developer to join our team...',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with Next.js',
      'Familiarity with modern frontend build pipelines and tools',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Remote work options',
      'Flexible hours',
    ],
    tags: ['React', 'TypeScript', 'Frontend', 'Next.js'],
    isRemote: true,
    companyLogo: '/images/company-logo.png',
    companySize: '51-200 employees',
    industry: 'Information Technology & Services',
    website: 'https://techcorp.example.com',
    featured: true,
    applicationDeadline: '2023-08-15',
    skills: ['React', 'TypeScript', 'Next.js', 'CSS', 'HTML5']
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    postedDate: '2023-07-01',
    description: 'Join our backend team to build scalable and efficient systems...',
    requirements: [
      '4+ years of experience with Node.js',
      'Experience with databases (SQL/NoSQL)',
      'Knowledge of cloud services (AWS/GCP/Azure)',
      'Understanding of microservices architecture',
    ],
    benefits: [
      'Stock options',
      'Unlimited PTO',
      'Remote work flexibility',
      'Learning budget',
    ],
    tags: ['Node.js', 'TypeScript', 'Backend', 'AWS'],
    isRemote: true,
    companyLogo: '/images/company-logo-2.png',
    companySize: '201-500 employees',
    industry: 'SaaS',
    website: 'https://datasystems.example.com',
    featured: false,
    applicationDeadline: '2023-09-01',
    skills: ['Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes']
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    postedDate: '2023-07-10',
    description: 'We are looking for a talented UX/UI Designer to create amazing user experiences...',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma or Sketch',
      'Experience with user research',
      'Portfolio demonstrating design work',
    ],
    benefits: [
      'Flexible schedule',
      'Health benefits',
      'Professional development',
      'Creative work environment',
    ],
    tags: ['UI/UX', 'Figma', 'User Research', 'Prototyping'],
    isRemote: false,
    companyLogo: '/images/company-logo-3.png',
    companySize: '11-50 employees',
    industry: 'Design',
    website: 'https://designhub.example.com',
    featured: true,
    applicationDeadline: '2023-08-30',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research', 'Wireframing']
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Remote',
    type: 'Contract',
    salary: '$70 - $90/hr',
    postedDate: '2023-07-05',
    description: 'Looking for a DevOps Engineer to help us scale our infrastructure...',
    requirements: [
      'Experience with CI/CD pipelines',
      'Kubernetes and Docker expertise',
      'Infrastructure as Code (Terraform)',
      'Monitoring and logging solutions',
    ],
    benefits: [
      'Fully remote',
      'Flexible hours',
      'Contract-to-hire potential',
    ],
    tags: ['DevOps', 'AWS', 'Kubernetes', 'Terraform'],
    isRemote: true,
    companyLogo: '/images/company-logo-4.png',
    companySize: '51-200 employees',
    industry: 'Cloud Computing',
    website: 'https://cloudscale.example.com',
    featured: false,
    applicationDeadline: '2023-08-20',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker']
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    postedDate: '2023-07-15',
    description: 'Join our data science team to extract insights from complex datasets...',
    requirements: [
      'Advanced degree in Computer Science, Statistics, or related field',
      'Experience with Python and data science libraries',
      'Knowledge of machine learning algorithms',
      'Strong statistical background',
    ],
    benefits: [
      'Competitive salary',
      'Research opportunities',
      'Conference budget',
      'Health and wellness programs',
    ],
    tags: ['Data Science', 'Python', 'Machine Learning', 'Statistics'],
    isRemote: true,
    companyLogo: '/images/company-logo-5.png',
    companySize: '11-50 employees',
    industry: 'Artificial Intelligence',
    website: 'https://analyticspro.example.com',
    featured: true,
    applicationDeadline: '2023-09-15',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Pandas']
  }
];

export async function fetchJobs(): Promise<Job[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobs);
    }, 500);
  });
}

// Function to generate a mock job with the given ID
function generateMockJob(id: string): ExtendedJob {
  const jobTemplates = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'We are looking for an experienced developer to join our team...',
      requirements: [
        '5+ years of experience with modern JavaScript',
        'Strong problem-solving skills',
        'Experience with React or similar frameworks',
      ],
      tags: ['React', 'TypeScript', 'Frontend'],
    },
    {
      title: 'Backend Engineer',
      company: 'DataSystems',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      description: 'Join our backend team to build scalable systems...',
      requirements: [
        '4+ years of backend development',
        'Experience with databases',
        'Cloud services knowledge',
      ],
      tags: ['Node.js', 'Python', 'AWS'],
    },
    {
      title: 'UX/UI Designer',
      company: 'DesignHub',
      type: 'Contract',
      salary: '$90,000 - $120,000',
      description: 'Create amazing user experiences for our products...',
      requirements: [
        '3+ years of design experience',
        'Proficiency in design tools',
        'Portfolio required',
      ],
      tags: ['UI/UX', 'Figma', 'Prototyping'],
    },
  ];

  // Pick a random template based on the ID to ensure consistency
  const template = jobTemplates[parseInt(id) % jobTemplates.length];
  const now = new Date();
  const postedDate = new Date(now);
  postedDate.setDate(now.getDate() - Math.floor(Math.random() * 30));
  
  const deadline = new Date(now);
  deadline.setDate(now.getDate() + 30 + Math.floor(Math.random() * 30));

  // For IDs that don't exist in mockJobs, use the template directly without modification
  // This ensures consistency between job card and job details
  return {
    id,
    title: template.title,
    company: template.company,
    location: ['San Francisco, CA', 'New York, NY', 'Remote', 'Austin, TX', 'Boston, MA', 'Seattle, WA'][parseInt(id) % 6],
    type: template.type,
    salary: template.salary,
    postedDate: postedDate.toISOString().split('T')[0],
    applicationDeadline: deadline.toISOString().split('T')[0],
    description: template.description,
    requirements: template.requirements,
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Flexible work hours',
      'Professional development budget',
    ],
    tags: [...template.tags],
    isRemote: Math.random() > 0.5,
    companyLogo: `/images/company-logo-${(parseInt(id) % 5) + 1}.png`,
    companySize: ['11-50 employees', '51-200 employees', '201-500 employees', '1000+ employees'][parseInt(id) % 4],
    industry: ['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education'][parseInt(id) % 5],
    website: `https://example-${id}.com`,
    featured: parseInt(id) % 3 === 0,
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'CSS'].slice(0, 3 + (parseInt(id) % 3)),
  };
}

export async function fetchJobById(id: string): Promise<ExtendedJob> {
  // In a real app, this would be an API call with the specific job ID
  return new Promise((resolve) => {
    setTimeout(() => {
      // First try to find the job in our mock data
      const job = mockJobs.find(job => job.id === id);
      
      // If not found, generate a mock job dynamically
      if (!job) {
        console.log(`Job ${id} not found in mock data, generating dynamically`);
        resolve(generateMockJob(id));
        return;
      }
      
      resolve(job);
    }, 300);
  });
}
