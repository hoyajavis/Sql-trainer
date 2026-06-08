import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, FlaskConical, GraduationCap, HeartPulse, PlaySquare, Trophy, Plane, MapPin, ArrowRight, AlertTriangle, BriefcaseBusiness } from 'lucide-react';
import { ChallengeDomain } from '@/src/types';

interface DomainSelectorModalProps {
  currentDomain?: ChallengeDomain;
  isOpen: boolean;
  onSelect: (domain: ChallengeDomain) => void;
  onClose?: () => void;
  isOnboarding?: boolean;
}

const DOMAINS = [
  {
    id: 'business' as ChallengeDomain,
    title: 'Business & E-Commerce',
    icon: <Briefcase className="w-8 h-8 text-indigo-400" />,
    description: 'Master practical queries for sales, users, and products.',
    tables: ['users', 'orders', 'products'],
    color: 'border-indigo-500/50',
    hover: 'hover:border-indigo-500',
    bg: 'bg-indigo-500/10'
  },
  {
    id: 'human_resources' as ChallengeDomain,
    title: 'Human Resources & Retail',
    icon: <BriefcaseBusiness className="w-8 h-8 text-cyan-400" />,
    description: 'Analyze employee performance, payrolls, and staffing across retail store locations.',
    tables: ['employees', 'departments', 'stores', 'payrolls', 'performance_reviews'],
    color: 'border-cyan-500/50',
    hover: 'hover:border-cyan-500',
    bg: 'bg-cyan-500/10'
  },
  {
    id: 'healthcare' as ChallengeDomain,
    title: 'Healthcare & EHR',
    icon: <HeartPulse className="w-8 h-8 text-rose-400" />,
    description: 'Work with patient records, providers, appointments, and diagnoses.',
    tables: ['patients', 'providers', 'appointments', 'diagnoses', 'prescriptions'],
    color: 'border-rose-500/50',
    hover: 'hover:border-rose-500',
    bg: 'bg-rose-500/10'
  },
  {
    id: 'science' as ChallengeDomain,
    title: 'Natural Science & Research',
    icon: <FlaskConical className="w-8 h-8 text-emerald-400" />,
    description: 'Track wildlife sightings, habitat zones, and research experiments.',
    tables: ['species', 'zones', 'researchers', 'sightings'],
    color: 'border-emerald-500/50',
    hover: 'hover:border-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 'education' as ChallengeDomain,
    title: 'Education & Administration',
    icon: <GraduationCap className="w-8 h-8 text-amber-400" />,
    description: 'Manage enrollments, students, professors, and grades.',
    tables: ['students', 'courses', 'enrollments', 'professors'],
    color: 'border-amber-500/50',
    hover: 'hover:border-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    id: 'media' as ChallengeDomain,
    title: 'Entertainment & Media',
    icon: <PlaySquare className="w-8 h-8 text-fuchsia-400" />,
    description: 'Work with users, tracks, artists, playlists, and listening history.',
    tables: ['users', 'tracks', 'artists', 'playlists', 'listening_history'],
    color: 'border-fuchsia-500/50',
    hover: 'hover:border-fuchsia-500',
    bg: 'bg-fuchsia-500/10'
  },
  {
    id: 'sports' as ChallengeDomain,
    title: 'Sports Analytics',
    icon: <Trophy className="w-8 h-8 text-orange-400" />,
    description: 'Analyze matches, track team performance, and query player stats.',
    tables: ['teams', 'players', 'matches', 'stats_log', 'venues'],
    color: 'border-orange-500/50',
    hover: 'hover:border-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    id: 'aviation' as ChallengeDomain,
    title: 'Aviation & Logistics',
    icon: <Plane className="w-8 h-8 text-sky-400" />,
    description: 'Manage fleets, flight statuses, crew tracking, and air traffic logistics.',
    tables: ['flights', 'airports', 'aircraft', 'crew_assignments', 'flight_status_history'],
    color: 'border-sky-500/50',
    hover: 'hover:border-sky-500',
    bg: 'bg-sky-500/10'
  },
  {
    id: 'real_estate' as ChallengeDomain,
    title: 'Real Estate & Geospatial',
    icon: <MapPin className="w-8 h-8 text-teal-400" />,
    description: 'Analyze real estate property listings, neighborhoods, and spatial locations.',
    tables: ['properties', 'neighborhoods', 'environmental_zones'],
    color: 'border-teal-500/50',
    hover: 'hover:border-teal-500',
    bg: 'bg-teal-500/10'
  }
];

export default function DomainSelectorModal({
  currentDomain,
  isOpen,
  onSelect,
  onClose,
  isOnboarding = false
}: DomainSelectorModalProps) {
  const [pendingDomain, setPendingDomain] = useState<ChallengeDomain | null>(null);

  if (!isOpen) return null;

  const handleSelectClick = (domainId: ChallengeDomain) => {
    if (isOnboarding) {
      onSelect(domainId);
    } else {
      if (domainId === currentDomain) {
        onClose?.();
      } else {
        setPendingDomain(domainId);
      }
    }
  };

  const confirmSwitch = () => {
    if (pendingDomain) {
      onSelect(pendingDomain);
      setPendingDomain(null);
      onClose?.();
    }
  };

  const cancelSwitch = () => {
    setPendingDomain(null);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-sm shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]"
          >
            {pendingDomain ? (
              <div className="p-6 space-y-6">
                <div className="flex justify-center">
                  <div className="bg-rose-500/10 p-4 rounded-full">
                    <AlertTriangle className="w-10 h-10 text-rose-400" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-bold text-white">Change Domain?</h2>
                  <p className="text-sm text-zinc-400">
                    Switching will reset your current SQL sandbox schema. Your progress in the current domain will be saved safely.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={cancelSwitch}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSwitch}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-rose-600 hover:bg-rose-500 transition"
                  >
                    Switch
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-6 text-center space-y-2 border-b border-zinc-800">
                  <h2 className="text-2xl font-bold text-white">Choose Your Path</h2>
                  <p className="text-sm text-zinc-400">
                    {isOnboarding
                      ? "Select a domain context for your SQL challenges. You can change this anytime."
                      : "Select a different domain context to practice SQL."}
                  </p>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto">
                  {DOMAINS.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => handleSelectClick(domain.id)}
                      className="w-full relative group text-left border border-zinc-800 bg-zinc-950 rounded-2xl p-4 transition hover:bg-zinc-800/50"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`${domain.bg} p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform`}>
                          {domain.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{domain.title}</h3>
                          <p className="text-xs text-zinc-400 mt-1">{domain.description}</p>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {domain.tables.map(t => (
                              <span key={t} className="px-1.5 py-0.5 rounded-md bg-zinc-800 text-[10px] text-zinc-300 font-mono">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 text-zinc-600 group-hover:translate-x-1 group-hover:text-white transition-all">
                        {currentDomain === domain.id ? (
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                        ) : (
                          <ArrowRight className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {!isOnboarding && (
                  <div className="p-4 border-t border-zinc-800">
                    <button
                      onClick={onClose}
                      className="w-full py-3 rounded-xl font-medium text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-800 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
