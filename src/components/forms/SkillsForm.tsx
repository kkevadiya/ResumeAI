import { useResume } from '@/contexts/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const SkillsForm = () => {
  const { resumeData, updateSkills } = useResume();
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill.trim()) {
      updateSkills([...resumeData.skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateSkills(resumeData.skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            placeholder="Add a new skill"
          />
          <Button onClick={handleAddSkill}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
              <button
                className="ml-2 text-destructive"
                onClick={() => handleRemoveSkill(skill)}
              >
                &times;
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;