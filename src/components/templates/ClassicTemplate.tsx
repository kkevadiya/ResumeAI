import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Mail, Phone, Globe } from 'lucide-react';

const ClassicTemplate = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, accentColor, photoUrl, fontFamily } = resumeData;

  const templateStyle = { fontFamily: `'${fontFamily}', serif` };
  const accentBorderStyle = { borderBottom: `2px solid ${accentColor}` };

  return (
    <div id="resume-preview" ref={ref} className="bg-white text-black p-8 shadow-lg h-full" style={templateStyle}>
      <header className="text-center mb-8 border-b pb-4" style={{ borderColor: accentColor }}>
        {photoUrl && (<img src={photoUrl} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />)}
        <h1 className="text-5xl font-bold tracking-wider">{personalInfo.name || 'YOUR NAME'}</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-700">
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone}</div>}
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /> {personalInfo.email}</div>}
          {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} /> {personalInfo.website}</div>}
        </div>
      </header>
      <main>
        {experience.length > 0 && (
          <section className="mb-6"><h2 className="text-xl font-bold mb-3 pb-1" style={accentBorderStyle}>Experience</h2>{experience.map((exp, index) => (<div key={index} className="mb-4 break-inside-avoid"><div className="flex justify-between items-start"><h3 className="text-lg font-semibold text-gray-900">{exp.position || 'Position'}</h3><p className="text-sm text-gray-600 whitespace-nowrap pl-4">{exp.startDate} - {exp.endDate}</p></div><p className="text-md italic text-gray-800">{exp.company || 'Company'}</p><ul className="list-disc list-inside mt-1 text-sm text-gray-700 space-y-1">{(exp.description || '').split('\n').map((line, i) => line && <li key={i}>{line}</li>)}</ul></div>))}</section>
        )}
        {education.length > 0 && (
          <section className="mb-6"><h2 className="text-xl font-bold mb-3 pb-1" style={accentBorderStyle}>Education</h2>{education.map((edu, index) => (<div key={index} className="mb-4 break-inside-avoid"><div className="flex justify-between items-start"><h3 className="text-lg font-semibold text-gray-900">{edu.degree || 'Degree'}</h3><p className="text-sm text-gray-600 whitespace-nowrap pl-4">{edu.startDate} - {edu.endDate}</p></div><p className="text-md italic text-gray-800">{edu.institution || 'Institution'}</p></div>))}</section>
        )}
        {skills.length > 0 && (
          <section><h2 className="text-xl font-bold mb-3 pb-1" style={accentBorderStyle}>Skills</h2><p className="text-sm text-gray-800">{skills.join(' · ')}</p></section>
        )}
      </main>
    </div>
  );
});

export default ClassicTemplate;