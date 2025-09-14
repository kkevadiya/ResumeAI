export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  website: string;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  id: string | null;
  accentColor: string;
  templateId: string;
  fontFamily: string;
  photoUrl: string | null;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}