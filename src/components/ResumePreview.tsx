import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import OnyxTemplate from '@/components/templates/OnyxTemplate';
import ClassicTemplate from '@/components/templates/ClassicTemplate';

const ResumePreview = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { resumeData } = useResume();

  if (resumeData.templateId === 'classic') {
    return <ClassicTemplate ref={ref} />;
  }
  
  // Default to Onyx template
  return <OnyxTemplate ref={ref} />;
});

export default ResumePreview;