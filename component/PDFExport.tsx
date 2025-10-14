'use client';

import { ResumeData } from '@/lib/types';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import ClientOnly from './ClientOnly';
import { analytics } from '@/lib/analytics';

interface PDFExportProps {
  data: ResumeData;
}

export default function PDFExport({ data }: PDFExportProps) {
  const generatePDF = () => {
    analytics.resumeExported('pdf'); // Track PDF export
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Helper function to add text
    const addText = (
      text: string,
      size: number,
      style: 'normal' | 'bold' = 'normal',
      color: [number, number, number] = [0, 0, 0]
    ) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', style);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      doc.text(lines, margin, yPosition);
      yPosition += size * 0.5 * lines.length + 2;
    };

    const addSpace = (space: number) => {
      yPosition += space;
    };

    const checkPageBreak = (spaceNeeded: number) => {
      if (yPosition + spaceNeeded > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 20;
      }
    };

    // Header
    addText(data.personalInfo.fullName || 'Your Name', 20, 'bold');
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
      data.personalInfo.linkedin,
      data.personalInfo.website,
    ].filter(Boolean).join(' • ');
    addText(contactInfo, 10);
    
    // Line under header
    doc.setDrawColor(0);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    addSpace(5);

    // Summary
    if (data.summary) {
      checkPageBreak(30);
      addText('PROFESSIONAL SUMMARY', 12, 'bold');
      addText(data.summary, 10);
      addSpace(5);
    }

    // Work Experience
    if (data.workExperience.length > 0) {
checkPageBreak(30);
addText('WORK EXPERIENCE', 12, 'bold');
addSpace(2);
  data.workExperience.forEach((exp) => {
    checkPageBreak(40);
    
    // Position and dates
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.position || 'Position', margin, yPosition);
    
    const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
    const dateWidth = doc.getTextWidth(dateText);
    doc.setFont('helvetica', 'normal');
    doc.text(dateText, pageWidth - margin - dateWidth, yPosition);
    yPosition += 6;

    // Company
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(exp.company || 'Company', margin, yPosition);
    yPosition += 5;

    // Bullets
    doc.setFont('helvetica', 'normal');
    exp.bullets.filter(b => b.trim()).forEach((bullet) => {
      checkPageBreak(15);
      const bulletLines = doc.splitTextToSize(`• ${bullet}`, pageWidth - 2 * margin - 5);
      doc.text(bulletLines, margin + 5, yPosition);
      yPosition += 5 * bulletLines.length;
    });

    addSpace(3);
  });
}

// Education
if (data.education.length > 0) {
  checkPageBreak(30);
  addText('EDUCATION', 12, 'bold');
  addSpace(2);

  data.education.forEach((edu) => {
    checkPageBreak(25);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(edu.degree || 'Degree', margin, yPosition);
    
    const eduDateText = `${edu.startDate} - ${edu.endDate}`;
    const eduDateWidth = doc.getTextWidth(eduDateText);
    doc.setFont('helvetica', 'normal');
    doc.text(eduDateText, pageWidth - margin - eduDateWidth, yPosition);
    yPosition += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(edu.school || 'School', margin, yPosition);
    yPosition += 5;

    if (edu.field) {
      doc.setFont('helvetica', 'normal');
      doc.text(edu.field, margin, yPosition);
      yPosition += 5;
    }

    if (edu.gpa) {
      doc.text(`GPA: ${edu.gpa}`, margin, yPosition);
      yPosition += 5;
    }

    addSpace(3);
  });
}

// Skills
if (data.skills.length > 0) {
  checkPageBreak(20);
  addText('SKILLS', 12, 'bold');
  addText(data.skills.join(' • '), 10);
}

// Save PDF
const fileName = data.personalInfo.fullName 
  ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
  : 'Resume.pdf';
doc.save(fileName);
};

return (
  <ClientOnly fallback={
    <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600/50 to-emerald-600/50 text-white/50 rounded-lg font-semibold">
      <Download className="w-4 h-4" />
      <span>Download PDF</span>
    </div>
  }>
    <button
      onClick={generatePDF}
      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 btn-glow"
    >
      <Download className="w-4 h-4" />
      <span>Download PDF</span>
    </button>
  </ClientOnly>
);
}
