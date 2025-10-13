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
        <div className="text-center border-b border-gray-400 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
            {data.personalInfo.fullName || ' Your Name'}
          </h1>
          <div className="text-sm text-gray-700 space-y-1">
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6 text-center">
            <p className="text-gray-800 leading-relaxed text-sm italic">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-400 pb-1">Professional Experience</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-gray-900 uppercase">{exp.company || 'COMPANY'}</span>
                    {exp.company && exp.position && <span className="text-gray-700">, </span>}
                    <span className="text-gray-700">{exp.position || 'Position'}</span>
                  </div>
                  <div className="text-right text-gray-600 text-sm italic">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="list-disc list-outside space-y-1 text-gray-800 ml-4 text-sm">
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
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-900 uppercase">{edu.school || 'SCHOOL'}</span>
                    <div className="text-gray-700 text-sm">
                      {edu.degree && edu.field ? `${edu.degree} in ${edu.field}` : edu.degree || edu.field || 'Degree'}
                      {edu.gpa && <span>, Honors: {edu.gpa}</span>}
                    </div>
                  </div>
                  <div className="text-right text-gray-600 text-sm italic">
                    {edu.endDate || 'Graduation Date'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Skills</h2>
            <ul className="list-disc list-outside text-gray-800 text-sm ml-4 space-y-1">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}