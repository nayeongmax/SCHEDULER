export type Subject = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export type StudyTask = {
  id: string;
  subject: string;
  subjectColor: string;
  title: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  date: string;
  isExamPeriod?: boolean;
};

export type ExamSchedule = {
  id: string;
  subject: string;
  date: string;
  time: string;
  range: string;
  difficulty: number;
  daysLeft?: number;
};

export type WrongAnswer = {
  id: string;
  subject: string;
  subjectColor: string;
  date: string;
  problem: string;
  imageUrl?: string;
  memo: string;
  tags: string[];
  solved: boolean;
  difficulty: 1 | 2 | 3;
};

export type Career = {
  id: string;
  title: string;
  category: string;
  description: string;
  relatedSubjects: string[];
  avgSalary: number;
  employmentRate: number;
  growthRate: number;
  workEnv: string;
  universities: string[];
  skills: string[];
  youtubeKeywords: string[];
};

export type HighSchool = {
  id: string;
  name: string;
  type: string;
  region: string;
  district: string;
  address: string;
  phone: string;
  website?: string;
  studentCount: number;
  teacherCount: number;
  classCount: number;
  suneungAvg?: number;
  univAdmissionRate?: number;
  skyRate?: number;
  scienceSpecial: boolean;
  mathSpecial: boolean;
  dormitory: boolean;
  internationalExchange: boolean;
  clubCount: number;
  rating: number;
  features: string[];
};
