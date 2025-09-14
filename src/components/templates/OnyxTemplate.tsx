import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { User, Phone, Mail, Globe, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';

const OnyxTemplate = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, accentColor, photoUrl, fontFamily } = resumeData;

  const templateStyle = { fontFamily: `'${fontFamily}', sans-serif` };

  return (
    <div id="resume-preview" ref={ref} className="bg-white text-gray-800 shadow-lg" style={templateStyle}>
      <div className="flex">
        <div className="w-1/3 text-white p-8" style={{ backgroundColor: accentColor }}>
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              {photoUrl ? (<img src={photoUrl} alt={personalInfo.name || 'Profile'} className="w-full h-full object-cover" />) : (<User className="w-16 h-16 text-white/60" />)}
            </div>
            <h1 className="text-3xl font-bold text-center">{personalInfo.name || 'Your Name'}</h1>
            <p className="text-lg text-white/80 mt-1">{'Graphic Designer'}</p>
          </div>
          <div className="mb-8"><h2 className="text-xl font-semibold border-b-2 border-white/50 mb-4 pb-2">Contact</h2><div className="flex items-center mb-3 text-sm break-all"><Phone size={16} className="flex-shrink-0 mr-3" /><span>{personalInfo.phone || 'Your Phone'}</span></div><div className="flex items-center mb-3 text-sm break-all"><Mail size={16} className="flex-shrink-0 mr-3" /><span>{personalInfo.email || 'Your Email'}</span></div><div className="flex items-center mb-3 text-sm break-all"><Globe size={16} className="flex-shrink-0 mr-3" /><span>{personalInfo.website || 'Your Website'}</span></div></div>
          <div><h2 className="text-xl font-semibold border-b-2 border-white/50 mb-4 pb-2">Education</h2>{education.map((edu, index) => (<div key={index} className="mb-4"><h3 className="font-bold text-md">{edu.degree || 'Degree'}</h3><p className="text-sm text-white/80">{edu.institution || 'Institution'}</p><p className="text-xs text-white/60">{edu.startDate} - {edu.endDate}</p></div>))}</div>
        </div>
        <div className="w-2/3 p-8">
          <section className="mb-8"><h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">Work Experience</h2>{experience.map((exp, index) => (<div key={index} className="mb-6"><h3 className="text-xl font-semibold">{exp.position || 'Position'}</h3><div className="flex justify-between text-sm text-gray-600 mb-1"><span>{exp.company || 'Company'}</span><span>{exp.startDate} - {exp.endDate}</span></div><ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">{(exp.description || '').split('\n').map((line, i) => line && <li key={i}>{line}</li>)}</ul></div>))}</section>
          <section><h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">Skills</h2><div className="flex flex-wrap gap-2">{skills.map((skill, index) => (<span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>))}</div></section>
        </div>
      </div>
    </div>
  );
});

export default OnyxTemplate;