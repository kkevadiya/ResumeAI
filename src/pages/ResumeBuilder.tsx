import { useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import { PhotoUpload } from "@/components/forms/PhotoUpload";
import ResumePreview from "@/components/ResumePreview";
import { useResume } from "@/contexts/ResumeContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Save, CheckCircle, AlertTriangle, Loader } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SaveStatusIndicator = () => {
    const { saveStatus } = useResume();
    if (saveStatus === 'saving') return <span className="text-sm text-muted-foreground animate-pulse">Saving...</span>;
    if (saveStatus === 'saved') return <span className="text-sm text-green-500 flex items-center"><CheckCircle className="h-4 w-4 mr-2" /> All changes saved</span>;
    if (saveStatus === 'error') return <span className="text-sm text-destructive flex items-center"><AlertTriangle className="h-4 w-4 mr-2" /> Error saving</span>;
    return null;
};

const TemplateSwitcher = () => {
    const { resumeData, updateTemplateId } = useResume();
    const templates = [{ id: 'onyx', name: 'Onyx' }, { id: 'classic', name: 'Classic' }];
    return (
        <Card className="mb-6"><CardHeader><CardTitle className="text-lg">Template</CardTitle></CardHeader><CardContent><div className="flex gap-2">
            {templates.map(template => (<Button key={template.id} variant={resumeData.templateId === template.id ? 'default' : 'outline'} onClick={() => updateTemplateId(template.id)}>{template.name}</Button>))}
        </div></CardContent></Card>
    );
};

const ColorPicker = () => {
    const { resumeData, updateAccentColor } = useResume();
    const colors = ['#4F46E5', '#DB2777', '#059669', '#EA580C', '#2563EB'];
    return (
        <Card className="mb-6"><CardHeader><CardTitle className="text-lg">Accent Color</CardTitle></CardHeader><CardContent><div className="flex gap-2">
            {colors.map(color => (<button key={color} onClick={() => updateAccentColor(color)} className={`w-8 h-8 rounded-full border-2 transition-transform duration-150 ${resumeData.accentColor === color ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} />))}
        </div></CardContent></Card>
    );
};

const FontSwitcher = () => {
    const { resumeData, updateFontFamily } = useResume();
    const fonts = ['Inter', 'Roboto', 'Lato', 'Merriweather', 'Source Sans Pro'];
    return (
        <Card className="mb-6"><CardHeader><CardTitle className="text-lg">Font Style</CardTitle></CardHeader><CardContent>
            <select value={resumeData.fontFamily} onChange={(e) => updateFontFamily(e.target.value)} className="w-full p-2 rounded-md bg-input text-foreground border">
                {fonts.map(font => (<option key={font} value={font} style={{ fontFamily: font }}>{font}</option>))}
            </select>
        </CardContent></Card>
    );
};

const ResumeBuilder = () => {
    const { saveResume, saveStatus, loading: isResumeLoading } = useResume();
    const resumePreviewRef = useRef<HTMLDivElement>(null);

    const handleExport = () => {
        const resumeToExport = resumePreviewRef.current;
        if (!resumeToExport) return;
        const originalWidth = resumeToExport.style.width;
        resumeToExport.style.width = '800px'; 

        html2canvas(resumeToExport, { scale: 2, useCORS: true }).then((canvas) => {
            resumeToExport.style.width = originalWidth;
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4', hotfixes: ["px_scaling"] });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    };

    if (isResumeLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-background"><Header /><div className="flex-grow flex justify-center items-center"><Loader className="h-8 w-8 animate-spin" /></div><Footer /></div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 pt-24 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-bold">Resume Builder</h1><div className="flex items-center gap-4"><SaveStatusIndicator /><Button size="sm" onClick={saveResume} disabled={saveStatus === 'saving'}> <Save className="mr-2 h-4 w-4" /> Save </Button><Button size="sm" onClick={handleExport}> <Download className="mr-2 h-4 w-4" /> Export </Button></div></div>
                        <TemplateSwitcher />
                        <ColorPicker />
                        <FontSwitcher />
                        <Accordion type="single" collapsible defaultValue="personal-info" className="w-full">
                            <AccordionItem value="personal-info"><AccordionTrigger>Personal Information</AccordionTrigger><AccordionContent><div className="space-y-6"><PhotoUpload /><PersonalInfoForm /></div></AccordionContent></AccordionItem>
                            <AccordionItem value="experience"><AccordionTrigger>Work Experience</AccordionTrigger><AccordionContent><ExperienceForm /></AccordionContent></AccordionItem>
                            <AccordionItem value="education"><AccordionTrigger>Education</AccordionTrigger><AccordionContent><EducationForm /></AccordionContent></AccordionItem>
                            <AccordionItem value="skills"><AccordionTrigger>Skills</AccordionTrigger><AccordionContent><SkillsForm /></AccordionContent></AccordionItem>
                        </Accordion>
                    </div>
                    <div className="lg:col-span-2 hidden lg:block"><div className="sticky top-24"><ResumePreview ref={resumePreviewRef} /></div></div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ResumeBuilder;