import React, { useState } from 'react';
import { X, Search, Navigation, CheckCircle2, Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShipmentRecord {
  id: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'Out for Delivery' | 'Customs Cleared';
  eta: string;
  vehicleNo: string;
  cargo: string;
  weight: string;
  client: string;
  milestones: { title: string; location: string; time: string; completed: boolean }[];
}

const SAMPLE_SHIPMENTS: Record<string, ShipmentRecord> = {
  'CFC-88219-DEL': {
    id: 'CFC-88219-DEL',
    origin: 'Okhla Phase 1 Hub, New Delhi',
    destination: 'JNPT Port Terminal, Nhava Sheva',
    status: 'In Transit',
    eta: 'Today, 18:30 IST',
    vehicleNo: 'DL 01 AA 4912 (Multi-Axle Container)',
    cargo: 'Export Automotive Sub-Assemblies (2x40ft FCL)',
    weight: '24.6 Metric Tons',
    client: 'Hyundai Motors Supply Line',
    milestones: [
      { title: 'Consignment Gate-Out', location: 'CFC Logistics Delhi Central Depot', time: 'Yesterday 08:30 IST', completed: true },
      { title: 'In-Transit GPS Toll Check', location: 'Jaipur Bypass Highway Plaza', time: 'Yesterday 17:15 IST', completed: true },
      { title: 'Midway Driver Relay & Safety Audit', location: 'Ahmedabad Logistics Park, Aslali', time: 'Today 04:00 IST', completed: true },
      { title: 'Approaching Port Gateway', location: 'Dronagiri Node, Navi Mumbai', time: 'ETA 16:45 IST', completed: false },
      { title: 'Customs Gate-In & Port Evacuation', location: 'JNPT Port Berth 4', time: 'ETA 18:30 IST', completed: false },
    ],
  },
  'CFC-94102-MUM': {
    id: 'CFC-94102-MUM',
    origin: 'Wadala Terminal, Mumbai',
    destination: 'Sriperumbudur Hub, Chennai',
    status: 'Out for Delivery',
    eta: 'Today, 14:00 IST',
    vehicleNo: 'MH 04 ER 8820 (Heavy Commercial FTL)',
    cargo: 'Industrial Radial Commercial Tyres',
    weight: '18.2 Metric Tons',
    client: 'Michelin India Logistics',
    milestones: [
      { title: 'Loaded & Sealed', location: 'CFC Mumbai Regional Terminal', time: '12 Sep 10:00 IST', completed: true },
      { title: 'In-Transit Express Rake Transit', location: 'Pune - Solapur Corridor', time: '13 Sep 02:30 IST', completed: true },
      { title: 'Regional Distribution Arrival', location: 'Hosur Road Depot, Bengaluru', time: '13 Sep 20:00 IST', completed: true },
      { title: 'Out for Plant Delivery', location: 'Chennai Port Outer Ring Corridor', time: 'Today 09:15 IST', completed: true },
      { title: 'Plant Dock Receipt', location: 'Consignee Plant, Chennai', time: 'ETA 14:00 IST', completed: false },
    ],
  },
  'CFC-73194-MND': {
    id: 'CFC-73194-MND',
    origin: 'Mundra Port APSEZ, Gujarat',
    destination: 'Transport Nagar, Ludhiana, Punjab',
    status: 'Customs Cleared',
    eta: 'Tomorrow, 11:00 IST',
    vehicleNo: 'GJ 12 Z 7109 (Dedicated Heavy Haulage)',
    cargo: 'Imported Specialty Raw Polymers & Resins',
    weight: '31.5 Metric Tons',
    client: 'Bayer CropScience Partner',
    milestones: [
      { title: 'Vessel Unloaded & Berthing', location: 'Mundra Port Terminal Desk', time: '13 Sep 14:00 IST', completed: true },
      { title: 'Port Customs Assessment & Bill of Entry', location: 'Customs House, APSEZ Mundra', time: '14 Sep 09:30 IST', completed: true },
      { title: 'Bonded Transit Clearance & Gate Pass', location: 'CFC Port Clearance Bureau', time: 'Today 11:45 IST', completed: true },
      { title: 'Mainline National Highway Transit', location: 'Palanpur - Abu Road Highway', time: 'In Progress', completed: false },
      { title: 'Delivery to Inland Factory Depot', location: 'Ludhiana Industrial Area', time: 'ETA Tomorrow 11:00 IST', completed: false },
    ],
  },
};

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose }) => {
  const [consignmentId, setConsignmentId] = useState('CFC-88219-DEL');
  const [activeShipment, setActiveShipment] = useState<ShipmentRecord>(SAMPLE_SHIPMENTS['CFC-88219-DEL']);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = consignmentId.trim().toUpperCase();
    if (SAMPLE_SHIPMENTS[cleanId]) {
      setActiveShipment(SAMPLE_SHIPMENTS[cleanId]);
      setErrorMessage('');
    } else {
      setErrorMessage(`Consignment "${cleanId}" not found. Try one of the verified sample consignments below.`);
    }
  };

  const selectSample = (id: string) => {
    setConsignmentId(id);
    setActiveShipment(SAMPLE_SHIPMENTS[id]);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B192C] text-white border-2 border-sky-500 rounded-xs max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#071322] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block font-heading">
                24/7 TELEMATICS & GPS FLEET TRACKER
              </span>
              <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-wide font-heading">
                CFC LOGISTICS CONSIGNMENT LOOKUP
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[82vh] overflow-y-auto space-y-5">
          
          {/* Search Input Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={consignmentId}
                onChange={(e) => setConsignmentId(e.target.value)}
                placeholder="Enter Consignment or B/L No. (e.g. CFC-88219-DEL)"
                className="w-full bg-[#081525] border border-slate-700 pl-10 pr-4 py-2.5 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400 uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xs cursor-pointer font-heading"
            >
              QUERY STATUS
            </button>
          </form>

          {/* Quick Click Sample Consignments */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Verified Active Shipments:</span>
            {Object.keys(SAMPLE_SHIPMENTS).map((id) => (
              <button
                key={id}
                onClick={() => selectSample(id)}
                className={`px-2.5 py-1 rounded-xs border text-[11px] font-mono cursor-pointer transition-all ${
                  activeShipment.id === id
                    ? 'bg-sky-950 text-sky-300 border-sky-500 font-bold'
                    : 'bg-[#091524] text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded-xs">
              {errorMessage}
            </div>
          )}

          {/* Active Shipment Display Card */}
          {activeShipment && (
            <div className="space-y-4">
              
              {/* Status Header Box */}
              <div className="bg-[#0e2238] border border-slate-800 p-4 sm:p-5 rounded-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Consignment / Docket No.</span>
                    <div className="text-lg font-extrabold text-white font-mono">{activeShipment.id}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold uppercase rounded-xs">
                      {activeShipment.status}
                    </span>
                    <span className="px-3 py-1 bg-[#071220] text-amber-400 border border-slate-700 text-xs font-bold rounded-xs flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeShipment.eta}</span>
                    </span>
                  </div>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Origin Node</span>
                    <span className="font-semibold text-slate-200">{activeShipment.origin}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Destination Port/Hub</span>
                    <span className="font-semibold text-slate-200">{activeShipment.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Dedicated Vehicle</span>
                    <span className="font-semibold text-amber-300 font-mono">{activeShipment.vehicleNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Cargo & Weight</span>
                    <span className="font-semibold text-slate-200">{activeShipment.weight}</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Timeline */}
              <div className="bg-[#091524] border border-slate-800 p-4 sm:p-5 rounded-xs">
                <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-4 font-heading flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GPS TELEMETRY TRANSIT CHECKPOINTS</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                  {activeShipment.milestones.map((milestone, idx) => (
                    <div key={idx} className="relative">
                      {/* Milestone Dot */}
                      <div
                        className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          milestone.completed
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'bg-slate-900 border-slate-600'
                        }`}
                      >
                        {milestone.completed && <CheckCircle2 className="w-3 h-3 text-slate-950" />}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <div className={`text-xs sm:text-sm font-bold ${milestone.completed ? 'text-white' : 'text-slate-400'}`}>
                            {milestone.title}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                            <span>{milestone.location}</span>
                          </div>
                        </div>
                        <span className={`text-[11px] font-mono shrink-0 ${milestone.completed ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {milestone.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Liaison Notice */}
              <div className="bg-[#071322] border-l-4 border-amber-500 p-3.5 rounded-xs text-xs text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Need urgent rerouting or consignee documentation for this docket?</span>
                </div>
                <a
                  href="tel:+918287703703"
                  className="font-bold text-amber-400 hover:underline uppercase tracking-wider shrink-0"
                >
                  Call Control: +91 8287 703703
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
