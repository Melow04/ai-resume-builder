'use client';

import { useState } from 'react';
import { ResumeData, WorkExperience, Education, generateId } from '@/lib/types';
import { Sparkles, Plus, Trash2, Loader2 } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [improvingId, setImprovingId] = useState<string | null>(null);

  const improveText = async (text: string, type: string, callback: (improved: string) => void) => {
    try {
      analytics.aiImprovementUsed(type); // Track AI usage
      const response = await fetch('/api/improve-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type }),
      });
      const result = await response.json();
      if (result.improvedText) {
        callback(result.improvedText);
      }
    } catch (error) {
      console.error('Error improving text:', error);
      alert('Failed to improve text. Please try again.');
    }
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bullets: [''],
    };
    analytics.track('work_experience_added'); // Track feature usage
    onChange({ ...data, workExperience: [...data.workExperience, newExp] });
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: any) => {
    const updated = data.workExperience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, workExperience: updated });
  };

  const deleteWorkExperience = (id: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.filter(exp => exp.id !== id),
    });
  };

  const addBullet = (expId: string) => {
    const updated = data.workExperience.map(exp =>
      exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
    );
    onChange({ ...data, workExperience: updated });
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    const updated = data.workExperience.map(exp =>
      exp.id === expId
        ? {
            ...exp,
            bullets: exp.bullets.map((b, i) => (i === bulletIndex ? value : b)),
          }
        : exp
    );
    onChange({ ...data, workExperience: updated });
  };

  const deleteBullet = (expId: string, bulletIndex: number) => {
    const updated = data.workExperience.map(exp =>
      exp.id === expId
        ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIndex) }
        : exp
    );
    onChange({ ...data, workExperience: updated });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = data.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: updated });
  };

  const deleteEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <section className="glass rounded-xl p-6 card-hover">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={data.personalInfo.fullName}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, fullName: e.target.value },
              })
            }
            autoComplete="name"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-white/10 transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            value={data.personalInfo.email}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, email: e.target.value },
              })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-white/10 transition-all"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={data.personalInfo.phone}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, phone: e.target.value },
              })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-white/10 transition-all"
          />
          <input
            type="text"
            placeholder="Location"
            value={data.personalInfo.location}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, location: e.target.value },
              })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-white/10 transition-all"
          />
          <input
            type="text"
            placeholder="LinkedIn (optional)"
            value={data.personalInfo.linkedin || ''}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, linkedin: e.target.value },
              })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-white/10 transition-all"
          />
          <input
            type="text"
            placeholder="Website (optional)"
            value={data.personalInfo.website || ''}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, website: e.target.value },
              })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:bg-white/10 transition-all"
          />
        </div>
      </section>

      {/* Summary */}
      <section className="glass rounded-xl p-6 card-hover">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          Professional Summary
        </h2>
        <div className="space-y-3">
          <textarea
            placeholder="Write a brief professional summary..."
            value={data.summary}
            onChange={(e) => onChange({ ...data, summary: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 h-28 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
          />
          <button
            onClick={async () => {
              if (!data.summary.trim()) return;
              setImprovingId('summary');
              await improveText(data.summary, 'summary', (improved) => {
                onChange({ ...data, summary: improved });
              });
              setImprovingId(null);
            }}
            disabled={improvingId === 'summary' || !data.summary.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 btn-glow"
          >
            {improvingId === 'summary' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Improving...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Improve with AI</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Work Experience */}
      <section className="glass rounded-xl p-6 card-hover">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            Work Experience
          </h2>
          <button
            onClick={addWorkExperience}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {data.workExperience.map((exp, expIndex) => (
          <div key={exp.id} className="mb-4 p-5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg text-white">Experience {expIndex + 1}</h3>
              <button
                onClick={() => deleteWorkExperience(exp.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-white/10 transition-all"
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-white/10 transition-all"
              />
              <input
                type="text"
                placeholder="Start Date (e.g., Jan 2020)"
                value={exp.startDate}
                onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-white/10 transition-all"
              />
              <input
                type="text"
                placeholder="End Date (e.g., Dec 2022)"
                value={exp.endDate}
                onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-white/10 transition-all disabled:opacity-50"
              />
            </div>

            <label className="flex items-center gap-2 mb-4 text-gray-300 cursor-pointer group">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => {
                  updateWorkExperience(exp.id, 'current', e.target.checked);
                  if (e.target.checked) {
                    updateWorkExperience(exp.id, 'endDate', 'Present');
                  }
                }}
                className="w-4 h-4 accent-cyan-500"
              />
              <span className="text-sm group-hover:text-white transition-colors">I currently work here</span>
            </label>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">Achievements & Responsibilities</label>
              {exp.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2">
                  <textarea
                    placeholder="• Describe your achievement or responsibility..."
                    value={bullet}
                    onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 h-24 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
                  />
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={async () => {
                        if (!bullet.trim()) return;
                        setImprovingId(`${exp.id}-${bulletIndex}`);
                        await improveText(bullet, 'bullet', (improved) => {
                          updateBullet(exp.id, bulletIndex, improved);
                        });
                        setImprovingId(null);
                      }}
                      disabled={improvingId === `${exp.id}-${bulletIndex}` || !bullet.trim()}
                      className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 transition-all"
                      title="Improve with AI"
                    >
                      {improvingId === `${exp.id}-${bulletIndex}` ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteBullet(exp.id, bulletIndex)}
                      className="p-2.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                      title="Delete bullet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => addBullet(exp.id)}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Bullet Point
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="glass rounded-xl p-6 card-hover">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Education
          </h2>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {data.education.map((edu, index) => (
          <div key={edu.id} className="mb-4 p-5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg text-white">Education {index + 1}</h3>
              <button
                onClick={() => deleteEducation(edu.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="School/University"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:bg-white/10 transition-all"
              />
              <input
                type="text"
                placeholder="Degree (e.g., Bachelor of Science)"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:bg-white/10 transition-all"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:bg-white/10 transition-all"
              />
              <input
                type="text"
                placeholder="GPA (optional)"
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:bg-white/10 transition-all"
              />
              <input
                type="text"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:bg-white/10 transition-all"
              />
              <input
                type="text"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="glass rounded-xl p-6 card-hover">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          Skills
        </h2>
        <div className="space-y-3">
          <textarea
            placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js, Python)"
            value={data.skills.join(', ')}
            onChange={(e) => {
              // Allow spaces within skills but split by commas
              const value = e.target.value;
              const skills = value.split(',').map(s => s.trim()).filter(Boolean);
              onChange({
                ...data,
                skills: skills,
              });
            }}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 h-28 text-white placeholder-gray-500 focus:border-orange-500 focus:bg-white/10 transition-all resize-none"
          />
          <button
            onClick={async () => {
              const raw = data.skills.join(', ').trim();
              if (!raw) return;
              setImprovingId('skills');
              await improveText(raw, 'skills', (improved) => {
                const cleaned = improved
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);
                onChange({ ...data, skills: cleaned });
              });
              setImprovingId(null);
            }}
            disabled={improvingId === 'skills' || data.skills.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 btn-glow"
          >
            {improvingId === 'skills' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Improving...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Improve with AI</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}