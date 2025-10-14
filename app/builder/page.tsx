'use client';

import { useState, useEffect } from 'react';
import { ResumeData, defaultResumeData } from '@/lib/types';
import ResumeForm from '@/component/ResumeForm';
import ResumePreview from '@/component/ResumePreview';
import PDFExport from '@/component/PDFExport';
import ClientOnly from '@/component/ClientOnly';
import { Trash2, Upload, FileDown } from 'lucide-react';

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
        setLastSaved(new Date());
      } catch {
        // Error loading saved data
      }
    }
  }, []);

  // Auto-save to localStorage (only on client side)
  useEffect(() => {
    if (isClient && resumeData !== defaultResumeData) {
      setIsSaving(true);
      const timer = setTimeout(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        setLastSaved(new Date());
        setIsSaving(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resumeData, isClient]);

  const clearData = () => {
    if (isClient && confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('resumeData');
      setResumeData(defaultResumeData);
      setLastSaved(null);
    }
  };

  const exportJSON = () => {
    if (!isClient) return;
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isClient) return;
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setResumeData(data);
        localStorage.setItem('resumeData', JSON.stringify(data));
        alert('Resume data imported successfully!');
      } catch {
        alert('Error importing file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen pt-10 mesh-gradient">
      {/* Header */}
      <div className="glass border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Resumeant — Resume Builder</h1>
              {lastSaved && isClient && (
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  {isSaving ? (
                    <>
                      <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-2 h-2 bg-[var(--primary)] rounded-full"></span>
                      Last saved: {lastSaved.toLocaleTimeString()}
                    </>
                  )}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportJSON}
                className="flex items-center gap-2 px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-all text-sm"
                title="Export as JSON"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              <label className="flex items-center gap-2 px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-all cursor-pointer text-sm" title="Import JSON">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={importJSON}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={clearData}
                className="flex items-center gap-2 px-4 py-2 glass text-red-400 rounded-lg hover:bg-red-500/10 transition-all text-sm"
                title="Clear all data"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <ClientOnly fallback={
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6 xl:h-[calc(100vh-200px)] xl:overflow-y-auto xl:pr-4 custom-scroll">
              <div className="glass rounded-xl p-6 animate-pulse">
                <div className="h-8 bg-white/10 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 rounded"></div>
                  <div className="h-4 bg-white/5 rounded"></div>
                </div>
              </div>
            </div>
            <div className="xl:sticky xl:top-32 h-fit">
              <div className="glass rounded-xl p-6 mb-6 animate-pulse">
                <div className="h-6 bg-white/10 rounded"></div>
              </div>
              <div className="glass rounded-xl overflow-hidden shadow-2xl animate-pulse">
                <div className="h-96 bg-white/5"></div>
              </div>
            </div>
          </div>
        }>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="space-y-6 xl:h-[calc(100vh-200px)] xl:overflow-y-auto xl:pr-4 custom-scroll">
              <ResumeForm data={resumeData} onChange={setResumeData} />
            </div>

            {/* Right: Preview */}
            <div className="xl:sticky xl:top-32 h-fit">
              <div className="glass rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      Live Preview
                    </h2>
                    <p className="text-sm text-gray-400">Changes appear instantly</p>
                  </div>
                  <PDFExport data={resumeData} />
                </div>
              </div>
              <div className="glass rounded-xl overflow-hidden shadow-2xl xl:max-h-[calc(100vh-280px)] xl:overflow-y-auto custom-scroll">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  );
}