import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, Check, GraduationCap, Briefcase, Award, Shield, Code } from 'lucide-react';
import { personalInfo, skills } from '../data';
import { useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    // Create a text file containing the clean resume text to simulate download
    const resumeText = `
HARIHARAN RG
B.Tech Student - Artificial Intelligence & Data Science
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}

=========================================
PROFESSIONAL SUMMARY
=========================================
${personalInfo.aboutMe}

=========================================
EDUCATION
=========================================
J.N.N Institute of Engineering (J.N.N.I.E)
Degree: B.Tech in Artificial Intelligence & Data Science (2025 - 2029, Ongoing)
- Secured an impressive CGPA of 8.27 in the first year of college
- Focusing on ML, Neural Networks, and Database Systems
- Active participant in hackathons and lab structures

Higher Secondary Education
Degree: Higher Secondary Certificate (HSC) (2024 - 2025)
- Scored 90.83% in the academic year of 2024 - 2025

Secondary School Education
Degree: Secondary School Leaving Certificate (SSLC) (2022 - 2023)
- Scored 93.5% in the academic year of 2022 - 2023

=========================================
TECHNICAL SKILLS
=========================================
Programming Languages: Java, Python, C++, HTML, CSS, MySQL
Core Concepts: OOP, Data Structures & Algorithms, System Design, UML Design, Problem Solving
Tools: Git, GitHub, VS Code

=========================================
PROJECTS
=========================================
1. Personal Portfolio Website (React, Tailwind CSS, Vite)
   - Soft UI Claymorphic responsive design showcasing career details and certifications.
2. Responsive Landing Page (HTML5, CSS3, Flexbox)
   - Multi-device conversion optimized landing page.

=========================================
CERTIFICATIONS (Ongoing)
=========================================
- Java SE Programming Professional (Oracle Academy)
- Introduction to AI & ML (Google Cloud)
    `;

    const element = document.createElement("a");
    const file = new Blob([resumeText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Hariharan_RG_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#f0f3f8]/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden clay-card flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/50">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Resume Preview</h3>
                <p className="text-xs text-gray-500">Recruiter-friendly Interactive Curriculum Vitae</p>
              </div>
              <button
                onClick={onClose}
                className="clay-icon-btn p-2"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Resume Page Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white/40">
              <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
                
                {/* Resume Header */}
                <div className="text-center border-b border-gray-100 pb-6 mb-6">
                  <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{personalInfo.name}</h1>
                  <p className="text-clay-blue font-medium mt-1 text-sm md:text-base">{personalInfo.title}</p>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-3 font-mono">
                    <span>{personalInfo.email}</span>
                    <span>•</span>
                    <span>{personalInfo.phone}</span>
                    <span>•</span>
                    <span>Chennai, India</span>
                  </div>
                </div>

                {/* Resume Section: About */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Briefcase size={16} className="text-clay-blue" />
                    Professional Summary
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    {personalInfo.aboutMe}
                  </p>
                </div>

                {/* Resume Section: Education */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <GraduationCap size={16} className="text-clay-blue" />
                    Education
                  </h2>
                  <div className="space-y-4 border-l-2 border-clay-blue/30 pl-4 ml-2">
                    {/* B.Tech */}
                    <div>
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <h3 className="font-semibold text-gray-800 text-sm">J.N.N Institute of Engineering (J.N.N.I.E)</h3>
                        <span className="text-xs font-mono text-gray-500">2025 – 2029</span>
                      </div>
                      <p className="text-xs font-medium text-clay-blue">B.Tech – Artificial Intelligence & Data Science (Ongoing)</p>
                      <ul className="list-disc list-outside ml-4 mt-1 text-xs text-gray-600 space-y-0.5">
                        <li>Secured an impressive CGPA of 8.27 in the first year of college.</li>
                        <li>Currently studying core AI modules, Neural Networks, and Database Systems.</li>
                        <li>Engaging in interactive laboratory sessions, coding exercises, and algorithm architectures.</li>
                      </ul>
                    </div>

                    {/* HSC */}
                    <div>
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <h3 className="font-semibold text-gray-800 text-sm">Higher Secondary Education</h3>
                        <span className="text-xs font-mono text-gray-500">2024 – 2025</span>
                      </div>
                      <p className="text-xs font-medium text-clay-blue">Higher Secondary Certificate (HSC) — Score: 90.83%</p>
                      <ul className="list-disc list-outside ml-4 mt-1 text-xs text-gray-600">
                        <li>Demonstrated academic excellence in core science stream (Mathematics, Physics, Chemistry).</li>
                      </ul>
                    </div>

                    {/* SSLC */}
                    <div>
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <h3 className="font-semibold text-gray-800 text-sm">Secondary School Education</h3>
                        <span className="text-xs font-mono text-gray-500">2022 – 2023</span>
                      </div>
                      <p className="text-xs font-medium text-clay-blue">Secondary School Leaving Certificate (SSLC) — Score: 93.5%</p>
                      <ul className="list-disc list-outside ml-4 mt-1 text-xs text-gray-600">
                        <li>Exhibited stellar overall scholastic performance across general studies.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resume Section: Skills */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Code size={16} className="text-clay-blue" />
                    Technical Skills
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-2">
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 uppercase mb-1">Languages</h4>
                      <p className="text-xs text-gray-600">Java, Python, C++, HTML, CSS, MySQL</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 uppercase mb-1">Core Concepts</h4>
                      <p className="text-xs text-gray-600">OOP, Data Structures & Algorithms, System Design, UML Design, Problem Solving</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 uppercase mb-1">Tools & Platforms</h4>
                      <p className="text-xs text-gray-600">Git, GitHub, VS Code</p>
                    </div>
                  </div>
                </div>

                {/* Resume Section: Projects */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Shield size={16} className="text-clay-blue" />
                    Key Projects
                  </h2>
                  <div className="space-y-3 pl-2">
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">Personal Portfolio Website <span className="font-normal text-gray-500 font-mono text-[10px] ml-1">(React, Tailwind, Motion)</span></h4>
                      <p className="text-xs text-gray-600 mt-0.5">Designed a Claymorphism Soft UI website emphasizing visual aesthetics, responsiveness, and clear sections.</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">Responsive Landing Page <span className="font-normal text-gray-500 font-mono text-[10px] ml-1">(HTML5, CSS3, Flexbox)</span></h4>
                      <p className="text-xs text-gray-600 mt-0.5">Developed a conversion-optimized marketing landing page with fluid layouts and high readability scores.</p>
                    </div>
                  </div>
                </div>

                {/* Resume Section: Certifications */}
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Award size={16} className="text-clay-blue" />
                    Certifications & Training
                  </h2>
                  <ul className="list-disc list-outside ml-6 text-xs text-gray-600 space-y-1">
                    <li><strong>Java SE Programming Professional</strong> — Oracle Academy (Ongoing)</li>
                    <li><strong>Introduction to AI & ML</strong> — Google Cloud Training (Ongoing)</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Footer / Controls */}
            <div className="p-4 bg-white/60 border-t border-white/50 flex flex-wrap justify-between items-center gap-3">
              <span className="text-xs text-gray-500 font-medium ml-2">Format: standard PDF printable / text file</span>
              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="clay-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Printer size={14} />
                  Print / Save as PDF
                </button>
                <button
                  onClick={handleDownload}
                  className="clay-btn px-5 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  {downloaded ? (
                    <>
                      <Check size={14} />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      Download TXT
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
