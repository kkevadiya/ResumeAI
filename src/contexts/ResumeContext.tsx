import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ResumeData } from '@/types/resume';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './AuthContext';

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface ResumeContextType {
  resumeData: ResumeData;
  loading: boolean;
  saveStatus: SaveStatus;
  saveResume: () => Promise<void>;
  updatePersonalInfo: (data: ResumeData['personalInfo']) => void;
  updateExperience: (data: ResumeData['experience']) => void;
  updateEducation: (data: ResumeData['education']) => void;
  updateSkills: (data: ResumeData['skills']) => void;
  updateAccentColor: (color: string) => void;
  updateTemplateId: (templateId: string) => void;
  updatePhotoUrl: (url: string | null) => void;
  updateFontFamily: (font: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
};

const initialResumeData: ResumeData = {
  id: null,
  accentColor: '#4F46E5',
  templateId: 'onyx',
  fontFamily: 'Inter',
  photoUrl: null,
  personalInfo: { name: '', email: '', phone: '', website: '' },
  experience: [],
  education: [],
  skills: [],
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isFetched, setIsFetched] = useState(false);

  const saveResume = async () => {
      if (!session?.user || !resumeData || !isFetched) return;
      setSaveStatus("saving");
      
      const resumeCoreData = {
          user_id: session.user.id,
          full_name: resumeData.personalInfo.name,
          email: resumeData.personalInfo.email,
          phone: resumeData.personalInfo.phone,
          website: resumeData.personalInfo.website,
          skills: resumeData.skills,
          accent_color: resumeData.accentColor,
          template_id: resumeData.templateId,
          photo_url: resumeData.photoUrl,
          font_family: resumeData.fontFamily,
      };

      const dataToUpsert = resumeData.id ? { id: resumeData.id, ...resumeCoreData } : resumeCoreData;
      
      const { data: savedResume, error: resumeSaveError } = await supabase.from('resumes').upsert(dataToUpsert).select().single();
      
      if (resumeSaveError) {
        console.error('Error saving resume:', resumeSaveError);
        setSaveStatus("error");
        return;
      }

      if (savedResume) {
        const resumeId = savedResume.id;
        await supabase.from('experience').delete().eq('resume_id', resumeId);
        if (resumeData.experience.length > 0) {
          const experiencesToInsert = resumeData.experience.map(exp => ({...exp, id: undefined, resume_id: resumeId}));
          await supabase.from('experience').insert(experiencesToInsert);
        }

        await supabase.from('education').delete().eq('resume_id', resumeId);
        if (resumeData.education.length > 0) {
           const educationsToInsert = resumeData.education.map(edu => ({...edu, id: undefined, resume_id: resumeId}));
           await supabase.from('education').insert(educationsToInsert);
        }

        if (!resumeData.id) {
           setResumeData(prev => ({...prev, id: resumeId}));
        }
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!session?.user) {
        setLoading(false);
        setIsFetched(true);
        return;
      };
      
      const { data: resume } = await supabase.from('resumes').select('*').eq('user_id', session.user.id).single();

      if (resume) {
        const { data: experience } = await supabase.from('experience').select('*').eq('resume_id', resume.id);
        const { data: education } = await supabase.from('education').select('*').eq('resume_id', resume.id);
        
        setResumeData({
          id: resume.id,
          accentColor: resume.accent_color || '#4F46E5',
          templateId: resume.template_id || 'onyx',
          fontFamily: resume.font_family || 'Inter',
          photoUrl: resume.photo_url || null,
          personalInfo: { name: resume.full_name || '', email: resume.email || '', phone: resume.phone || '', website: resume.website || '' },
          experience: experience || [],
          education: education || [],
          skills: resume.skills || [],
        });
      }
      setLoading(false);
      setIsFetched(true);
    };
    if (session) fetchResumeData();
    else { setLoading(false); setIsFetched(true); }
  }, [session]);

  useEffect(() => {
    if (loading || !isFetched) return;
    const debounceSave = setTimeout(() => { saveResume(); }, 2000);
    return () => clearTimeout(debounceSave);
  }, [resumeData, isFetched, loading]);

  const updatePersonalInfo = (data: ResumeData['personalInfo']) => setResumeData((prev) => ({ ...prev, personalInfo: data }));
  const updateExperience = (data: ResumeData['experience']) => setResumeData((prev) => ({ ...prev, experience: data }));
  const updateEducation = (data: ResumeData['education']) => setResumeData((prev) => ({ ...prev, education: data }));
  const updateSkills = (data: ResumeData['skills']) => setResumeData((prev) => ({ ...prev, skills: data }));
  const updateAccentColor = (color: string) => setResumeData(prev => ({ ...prev, accentColor: color }));
  const updateTemplateId = (templateId: string) => setResumeData(prev => ({ ...prev, templateId }));
  const updatePhotoUrl = (url: string | null) => setResumeData(prev => ({ ...prev, photoUrl: url }));
  const updateFontFamily = (font: string) => setResumeData(prev => ({ ...prev, fontFamily: font }));

  return (
    <ResumeContext.Provider value={{ resumeData, loading, saveStatus, saveResume, updatePersonalInfo, updateExperience, updateEducation, updateSkills, updateAccentColor, updateTemplateId, updatePhotoUrl, updateFontFamily }}>
      {children}
    </ResumeContext.Provider>
  );
};