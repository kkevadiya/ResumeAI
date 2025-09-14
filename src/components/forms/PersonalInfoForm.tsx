import { useResume } from '@/contexts/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();

  const handleChange = (
    field: keyof typeof resumeData.personalInfo,
    value: string
  ) => {
    updatePersonalInfo({ ...resumeData.personalInfo, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input
              value={resumeData.personalInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={resumeData.personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              value={resumeData.personalInfo.website}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;