import { useResume } from '@/contexts/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const EducationForm = () => {
  const { resumeData, updateEducation } = useResume();

  const handleAddEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    updateEducation([...resumeData.education, newEducation]);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = [...resumeData.education];
    newEducation.splice(index, 1);
    updateEducation(newEducation);
  };

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    updateEducation(newEducation);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.education.map((edu, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) =>
                    handleChange(index, 'institution', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) =>
                    handleChange(index, 'degree', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleChange(index, 'startDate', e.target.value)
                  }
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleChange(index, 'endDate', e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={edu.description}
                onChange={(e) =>
                  handleChange(index, 'description', e.target.value)
                }
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={handleAddEducation}>Add Education</Button>
      </CardContent>
    </Card>
  );
};

export default EducationForm;