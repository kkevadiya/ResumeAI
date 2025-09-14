import { useResume } from '@/contexts/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ExperienceForm = () => {
  const { resumeData, updateExperience } = useResume();

  const handleAddExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    updateExperience([...resumeData.experience, newExperience]);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperience = [...resumeData.experience];
    newExperience.splice(index, 1);
    updateExperience(newExperience);
  };

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    updateExperience(newExperience);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) =>
                    handleChange(index, 'company', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  value={exp.position}
                  onChange={(e) =>
                    handleChange(index, 'position', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleChange(index, 'startDate', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleChange(index, 'endDate', e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) =>
                  handleChange(index, 'description', e.target.value)
                }
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => handleRemoveExperience(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={handleAddExperience}>Add Experience</Button>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;