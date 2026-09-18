import React, { useState } from 'react';
import { CAREER_OPENINGS } from '../data/cfcData';
import { CareerOpening } from '../types';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Upload, 
  Send,
  Users,
  Award
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<CareerOpening | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    experienceYears: '5',
    resumeName: '',
    coverNote: '',
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
  };

  const closeApplyModal = () => {
    setSelectedJob(null);
    setApplySuccess(false);
    setApplicant({
      name: '',
      email: '',
      phone: '',
      experienceYears: '5',
      resumeName: '',
      coverNote: '',
    });
  };

  return (
    <div className="bg-[#0B192C] text-white">
      
      {/* Page Header */}
      <div className="bg-[#071322] border-b border-slate-800 py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
            JOIN OUR TEAM OF OVER 200 LOGISTICS PROFESSIONALS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase font-heading text-white max-w-3xl">
            CAREERS AT CFC LOGISTICS
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Be part of an established, growing supply chain enterprise with 35 pan-India branches, 
            1,580 managed vehicles, and a collaborative operational culture grounded in safety and innovation.
          </p>
        </div>
      </div>

      {/* Workplace Culture & Core Pillars */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0e2238] border border-slate-800 p-6 rounded-xs">
            <div className="w-10 h-10 rounded-xs bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white uppercase font-heading">
              CULTURE OF EMPOWERMENT
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              We treat clients&apos; products as a serious responsibility. Our teams are empowered 
              with decision-making authority to solve real-time logistical challenges on ground.
            </p>
          </div>

          <div className="bg-[#0e2238] border border-slate-800 p-6 rounded-xs">
            <div className="w-10 h-10 rounded-xs bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white uppercase font-heading">
              MERIT & CAREER MOBILITY
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              With 35 branches across all major transport hubs and ports, high performers have 
              opportunities for regional leadership, fleet direction, and port customs management.
            </p>
          </div>

          <div className="bg-[#0e2238] border border-slate-800 p-6 rounded-xs">
            <div className="w-10 h-10 rounded-xs bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white uppercase font-heading">
              TECHNOLOGY-DRIVEN LOGISTICS
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Work with state-of-the-art GPS telematics, automated warehouse management systems (WMS), 
              and single-window supply chain dashboards.
            </p>
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="border-b border-slate-800 pb-4 mb-8">
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider font-heading block">
            CURRENT VACANCIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-heading mt-1">
            OPEN POSITIONS ACROSS INDIA
          </h2>
        </div>

        <div className="space-y-6">
          {CAREER_OPENINGS.map((job) => (
            <div
              key={job.id}
              className="bg-[#0e2238] border border-slate-800 p-6 sm:p-8 rounded-xs hover:border-slate-600 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-xs uppercase tracking-wider">
                    {job.department}
                  </span>
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-heading">
                  {job.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Experience: {job.experience}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full lg:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-xs cursor-pointer font-heading shadow flex items-center justify-center gap-2"
                >
                  <span>APPLY FOR POSITION</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* General Application Note */}
        <div className="mt-12 bg-[#071322] border border-slate-800 p-6 rounded-xs text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white uppercase font-heading block mb-0.5">
              Don&apos;t see a matching vacancy?
            </strong>
            Send your curriculum vitae directly to our human resources division at{' '}
            <a href="mailto:careers@cfclogistics.in" className="text-amber-400 hover:underline">
              careers@cfclogistics.in
            </a>{' '}
            or{' '}
            <a href="mailto:info@cfclogistics.in" className="text-amber-400 hover:underline">
              info@cfclogistics.in
            </a>
          </div>
          <a
            href="mailto:careers@cfclogistics.in?subject=General%20Application%20-%20CFC%20Logistics"
            className="px-4 py-2 border border-slate-700 text-slate-200 text-xs font-bold uppercase rounded-xs hover:bg-slate-800 shrink-0"
          >
            EMAIL CV DIRECTLY
          </a>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B192C] text-white border-2 border-amber-500 rounded-xs max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-[#071322] p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest font-heading">
                  CFC LOGISTICS JOB APPLICATION
                </span>
                <h3 className="text-base sm:text-lg font-extrabold uppercase font-heading text-white mt-0.5">
                  {selectedJob.title}
                </h3>
              </div>
              <button
                onClick={closeApplyModal}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {applySuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-extrabold font-heading text-white uppercase">
                    APPLICATION SUBMITTED SUCCESSFULLY
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{applicant.name}</strong>. Your application 
                    for <strong className="text-amber-400">{selectedJob.title}</strong> at CFC Logistics Pvt. Ltd. has been forwarded to HR.
                  </p>
                  <button
                    onClick={closeApplyModal}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-extrabold uppercase text-xs tracking-wider rounded-xs cursor-pointer font-heading"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicant.name}
                      onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Rathore"
                      className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicant.email}
                        onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold uppercase mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicant.phone}
                        onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">
                      Years of Relevant Supply Chain / Logistics Experience *
                    </label>
                    <select
                      value={applicant.experienceYears}
                      onChange={(e) => setApplicant({ ...applicant, experienceYears: e.target.value })}
                      className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none"
                    >
                      <option value="1-3">1–3 Years</option>
                      <option value="4-7">4–7 Years</option>
                      <option value="8-12">8–12 Years</option>
                      <option value="12+">12+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">
                      Upload Resume / Curriculum Vitae (PDF or DOC)
                    </label>
                    <div className="border-2 border-dashed border-slate-700 p-4 rounded-xs text-center hover:border-amber-500 transition-colors">
                      <Upload className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <span className="text-[11px] text-slate-300 block font-medium">
                        {applicant.resumeName || 'Click to select or drag & drop your CV file'}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setApplicant({ ...applicant, resumeName: e.target.files[0].name });
                          }
                        }}
                        className="mt-2 text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-xs file:border-0 file:text-[10px] file:bg-amber-500 file:text-slate-950 file:font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">
                      Brief Cover Summary or Logistics Achievements
                    </label>
                    <textarea
                      rows={2}
                      value={applicant.coverNote}
                      onChange={(e) => setApplicant({ ...applicant, coverNote: e.target.value })}
                      placeholder="Highlight relevant experience in fleet management, customs ICEGATE, or warehouse WMS..."
                      className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeApplyModal}
                      className="px-4 py-2 border border-slate-700 text-slate-300 hover:text-white uppercase font-bold rounded-xs cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 uppercase font-extrabold rounded-xs cursor-pointer font-heading flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT CANDIDACY</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
