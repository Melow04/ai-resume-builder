'use client';

import { ResumeData } from '@/lib/types';

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="bg-white shadow-2xl" id="resume-preview">
      <div className="max-w-3xl mx-auto p-10">
        {/* Header */}
        <div className="border-b-2 border-gray-900 pb-5 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
            {data.personalInfo.email && <span className="font-medium">{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
            {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span>• {data.personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">Professional Summary</h2>
            <p className="text-gray-800 leading-relaxed text-[15px]">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">Work Experience</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{exp.position || 'Position'}</h3>
                    <p className="text-gray-700 font-medium">{exp.company || 'Company'}</p>
                  </div>
                  <span className="text-gray-600 text-sm whitespace-nowrap ml-4 font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="list-disc list-outside space-y-1.5 text-gray-800 ml-5 text-[15px]">
                    {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                      <li key={i} className="leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{edu.degree || 'Degree'}</h3>
                    <p className="text-gray-700 font-medium">{edu.school || 'School'}</p>
                    {edu.field && <p className="text-gray-600 text-sm mt-0.5">{edu.field}</p>}
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-gray-600 text-sm whitespace-nowrap ml-4 font-medium">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">Skills</h2>
            <p className="text-gray-800 text-[15px] leading-relaxed">{data.skills.join(' • ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}