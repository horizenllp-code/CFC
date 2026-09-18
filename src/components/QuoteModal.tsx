import React, { useState } from 'react';
import { X, CheckCircle2, Calculator, Send, AlertCircle } from 'lucide-react';
import { SERVICES } from '../data/cfcData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceId: SERVICES[0].id,
    originCity: 'Delhi NCR',
    destinationCity: 'Mumbai / JNPT Port',
    cargoType: 'Industrial / Automotive',
    loadType: 'Full Truck Load (FTL)',
    weightTons: '12',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Contact name is required';
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid corporate email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid phone number is required (min 10 digits)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B192C] text-white border-2 border-amber-500 rounded-xs max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#071322] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block font-heading">
                CFC LOGISTICS PVT. LTD.
              </span>
              <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-wide font-heading">
                REQUEST FREIGHT QUOTE & TENDER
              </h3>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold font-heading text-white uppercase">
                ENQUIRY TRANSMITTED SUCCESSFULLY
              </h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong> from{' '}
                <strong className="text-white">{formData.company}</strong>. Your freight requirement between{' '}
                <span className="text-amber-400">{formData.originCity}</span> and{' '}
                <span className="text-amber-400">{formData.destinationCity}</span> has been logged.
              </p>
              <div className="bg-[#0e2238] border border-slate-800 p-4 rounded text-xs text-slate-300 max-w-md mx-auto text-left">
                <div className="text-amber-400 font-bold uppercase mb-1">Direct Liaison Assigned:</div>
                <div>ManMohan Sharma (Head - Sales & Business Development)</div>
                <div>Phone: +91 8287 703703 | Email: manmohansharma@cfclogistics.in</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Our commercial team will revert within 2 business hours with freight tariff and transit schedule.
                </div>
              </div>
              <button
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold uppercase text-xs tracking-wider rounded-xs cursor-pointer font-heading"
              >
                CLOSE WINDOW
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Malhotra"
                    className={`w-full bg-[#081525] border px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400 ${
                      errors.name ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-red-400 mt-0.5">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Havells / Bayer Ltd."
                    className={`w-full bg-[#081525] border px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400 ${
                      errors.company ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.company && <span className="text-[10px] text-red-400 mt-0.5">{errors.company}</span>}
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`w-full bg-[#081525] border px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400 ${
                      errors.email ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-400 mt-0.5">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-[#081525] border px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400 ${
                      errors.phone ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-400 mt-0.5">{errors.phone}</span>}
                </div>
              </div>

              {/* Row 3: Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Required Logistics Service *
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id} className="bg-[#0B192C]">
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Route Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Origin Hub / City *
                  </label>
                  <input
                    type="text"
                    value={formData.originCity}
                    onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                    placeholder="City or Port"
                    className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Destination Hub / Port *
                  </label>
                  <input
                    type="text"
                    value={formData.destinationCity}
                    onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                    placeholder="City or Port"
                    className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Row 5: Cargo Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Cargo Profile
                  </label>
                  <select
                    value={formData.cargoType}
                    onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                    className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-xs sm:text-sm text-white rounded-xs focus:outline-none"
                  >
                    <option value="Industrial / Automotive">Automotive / Engineering</option>
                    <option value="Tyres & Rubber">Tyres & Rubber</option>
                    <option value="Electrical & Electronics">Electrical / Appliances</option>
                    <option value="Chemicals / Agrochemicals">Chemicals / Agro</option>
                    <option value="FMCG & Consumer Goods">FMCG & Packaged Foods</option>
                    <option value="Over-Dimensional Heavy Cargo">Over-Dimensional Heavy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Load Type
                  </label>
                  <select
                    value={formData.loadType}
                    onChange={(e) => setFormData({ ...formData, loadType: e.target.value })}
                    className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-xs sm:text-sm text-white rounded-xs focus:outline-none"
                  >
                    <option value="Full Truck Load (FTL)">Full Truck Load (FTL)</option>
                    <option value="Chartered Vehicle">Dedicated Chartered Fleet</option>
                    <option value="20ft Container (FCL)">20ft Container (FCL)</option>
                    <option value="40ft High Cube Container">40ft High Cube Container</option>
                    <option value="LCL / Part Load">LCL / Part Load</option>
                    <option value="Warehouse Space Booking">Warehouse Space (Sq. Ft.)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Approx Weight (Tons)
                  </label>
                  <input
                    type="number"
                    value={formData.weightTons}
                    onChange={(e) => setFormData({ ...formData, weightTons: e.target.value })}
                    className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Specific Requirements or Tender Reference
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Daily dispatched requirement, port clearance at JNPT, JIT plant delivery schedules..."
                  className="w-full bg-[#081525] border border-slate-700 px-3 py-2 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>I.B.A. Reg. DLC-1461 Compliant Carrier</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase rounded-xs cursor-pointer"
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-xs shadow cursor-pointer font-heading flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>PROCESSING...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>SUBMIT FOR TARIFF QUOTE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
