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
        <div className="border-b-2 border-gray-900 pb-2 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="text-xs text-gray-700">
            {[
              data.personalInfo.email,
              data.personalInfo.phone,
              data.personalInfo.location,
              data.personalInfo.linkedin,
              data.personalInfo.website,
            ].filter(Boolean).join(' • ')}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Professional Summary</h2>
            <p className="text-gray-800 leading-relaxed text-sm">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-400 pb-1">Work Experience</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-gray-900">
                    {exp.position || 'Position'}
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div className="text-gray-700 text-sm italic mb-2">
                  {exp.company || 'Company'}
                </div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="list-disc list-outside space-y-1 text-gray-800 ml-5 text-sm">
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
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-400 pb-1">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-gray-900">
                    {edu.degree || 'Degree'}
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate || 'Graduation Date'}
                  </div>
                </div>
                <div className="text-gray-700 text-sm italic mb-1">
                  {edu.school || 'School'}
                </div>
                {edu.field && (
                  <div className="text-gray-700 text-sm">
                    {edu.field}
                  </div>
                )}
                {edu.gpa && (
                  <div className="text-gray-700 text-sm">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {(typeof data.skills === 'string' ? data.skills : (data.skills as unknown as string[]).join(', ')).trim() && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Skills</h2>
            <div className="text-gray-800 text-sm space-y-2 whitespace-pre-line">
              {typeof data.skills === 'string' ? data.skills : (data.skills as unknown as string[]).join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}