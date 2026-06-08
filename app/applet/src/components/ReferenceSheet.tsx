import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Info, Hash, Type, Table, LayoutList, Network } from 'lucide-react';
import ReactFlow, { ReactFlowProvider, Background, Controls, Handle, Position, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { ChallengeDomain } from '@/src/types';

const TableNode = ({ data }: any) => {
  return (
     <div className="bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-500/30 rounded-lg shadow-sm w-64 shrink-0 font-sans">
       <div className="bg-indigo-50 dark:bg-indigo-500/10 border-b border-indigo-100 dark:border-indigo-500/20 px-4 py-2 flex items-center justify-between pointer-events-none">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">{data.table}</span>
       </div>
       <div className="p-0 relative pointer-events-none">
          {data.columns.map((col: any, cIdx: number) => {
             const isPK = col.type.includes('(PK)');
             const isFK = col.type.includes('(FK)');
             return (
                <div key={cIdx} className={`px-4 py-2 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 flex items-center justify-between text-xs transition-colors ${isPK ? 'bg-amber-50/50 dark:bg-amber-500/5' : ''} ${isFK ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : ''} relative`}>
                   
                   {/* Handles for edges */}
                   {isPK && <Handle type="target" position={Position.Left} id={col.name} className="!w-2 !h-2 !bg-amber-500 !border-white !-left-[5px] !opacity-100" />}
                   {isFK && <Handle type="source" position={Position.Right} id={col.name} className="!w-2 !h-2 !bg-emerald-500 !border-white !-right-[5px] !opacity-100" />}
                   
                   <div className="flex items-center gap-2">
                      {isPK && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" title="Primary Key" />}
                      {isFK && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Foreign Key" />}
                      {!isPK && !isFK && <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0" />}
                      <span className={`font-medium ${isPK ? 'text-amber-700 dark:text-amber-400' : isFK ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-400'}`}>
                         {col.name}
                      </span>
                   </div>
                   <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                      {col.type.replace(/\s*\(.*\)/, '')}
                   </span>
                </div>
             );
          })}
       </div>
     </div>
  );
};

const nodeTypes = { table: TableNode };

interface ReferenceSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeDomain?: ChallengeDomain;
}

const DOMAIN_SCHEMAS: Record<string, { table: string, columns: { name: string, type: string }[] }[]> = {
  business: [
    {
      table: 'users',
      columns: [
        { name: 'user_id', type: 'TEXT (PK)' },
        { name: 'first_name', type: 'TEXT' },
        { name: 'last_name', type: 'TEXT' },
        { name: 'address', type: 'TEXT' },
        { name: 'email', type: 'TEXT' },
      ]
    },
    {
      table: 'products',
      columns: [
        { name: 'product_id', type: 'TEXT (PK)' },
        { name: 'product_name', type: 'TEXT' },
        { name: 'description', type: 'TEXT' },
        { name: 'price', type: 'INTEGER' },
      ]
    },
    {
      table: 'orders',
      columns: [
        { name: 'order_id', type: 'TEXT (PK)' },
        { name: 'user', type: 'TEXT (FK)' },
        { name: 'product_ordered', type: 'TEXT (FK)' },
        { name: 'total_paid', type: 'INTEGER' },
      ]
    }
  ],
  science: [
    {
      table: 'species',
      columns: [
        { name: 'species_id', type: 'TEXT (PK)' },
        { name: 'common_name', type: 'TEXT' },
        { name: 'scientific_name', type: 'TEXT' },
        { name: 'conservation_status', type: 'TEXT' },
      ]
    },
    {
      table: 'zones',
      columns: [
        { name: 'zone_id', type: 'TEXT (PK)' },
        { name: 'zone_name', type: 'TEXT' },
        { name: 'habitat_type', type: 'TEXT' },
      ]
    },
    {
      table: 'researchers',
      columns: [
        { name: 'researcher_id', type: 'TEXT (PK)' },
        { name: 'first_name', type: 'TEXT' },
        { name: 'last_name', type: 'TEXT' },
        { name: 'specialty', type: 'TEXT' },
      ]
    },
    {
      table: 'sightings',
      columns: [
        { name: 'sighting_id', type: 'TEXT (PK)' },
        { name: 'species_id', type: 'TEXT (FK)' },
        { name: 'zone_id', type: 'TEXT (FK)' },
        { name: 'researcher_id', type: 'TEXT (FK)' },
        { name: 'health_status', type: 'TEXT' },
        { name: 'temperature_celsius', type: 'INTEGER' },
      ]
    }
  ],
  education: [
    {
      table: 'departments',
      columns: [
        { name: 'department_id', type: 'TEXT (PK)' },
        { name: 'department_name', type: 'TEXT' },
      ]
    },
    {
      table: 'professors',
      columns: [
        { name: 'professor_id', type: 'TEXT (PK)' },
        { name: 'first_name', type: 'TEXT' },
        { name: 'last_name', type: 'TEXT' },
        { name: 'department_id', type: 'TEXT (FK)' },
      ]
    },
    {
      table: 'students',
      columns: [
        { name: 'student_id', type: 'TEXT (PK)' },
        { name: 'first_name', type: 'TEXT' },
        { name: 'last_name', type: 'TEXT' },
        { name: 'enrollment_year', type: 'INTEGER' },
        { name: 'gpa', type: 'REAL' },
      ]
    },
    {
      table: 'courses',
      columns: [
        { name: 'course_id', type: 'TEXT (PK)' },
        { name: 'course_name', type: 'TEXT' },
        { name: 'department_id', type: 'TEXT (FK)' },
        { name: 'credits', type: 'INTEGER' },
      ]
    },
    {
      table: 'enrollments',
      columns: [
        { name: 'enrollment_id', type: 'TEXT (PK)' },
        { name: 'student_id', type: 'TEXT (FK)' },
        { name: 'course_id', type: 'TEXT (FK)' },
        { name: 'grade', type: 'TEXT' },
      ]
    }
  ],
  healthcare: [
    {
      table: 'patients',
      columns: [
        { name: 'patient_id', type: 'TEXT (PK)' },
        { name: 'first_name', type: 'TEXT' },
        { name: 'last_name', type: 'TEXT' },
        { name: 'date_of_birth', type: 'TEXT' },
        { name: 'gender', type: 'TEXT' },
      ]
    },
    {
      table: 'providers',
      columns: [
        { name: 'provider_id', type: 'TEXT (PK)' },
        { name: 'first_name', type: 'TEXT' },
        { name: 'last_name', type: 'TEXT' },
        { name: 'specialty', type: 'TEXT' },
      ]
    },
    {
      table: 'appointments',
      columns: [
        { name: 'appointment_id', type: 'TEXT (PK)' },
        { name: 'patient_id', type: 'TEXT (FK)' },
        { name: 'provider_id', type: 'TEXT (FK)' },
        { name: 'appointment_date', type: 'TEXT' },
        { name: 'status', type: 'TEXT' },
        { name: 'cost', type: 'REAL' },
      ]
    },
    {
      table: 'diagnoses',
      columns: [
        { name: 'diagnosis_id', type: 'TEXT (PK)' },
        { name: 'appointment_id', type: 'TEXT (FK)' },
        { name: 'icd_code', type: 'TEXT' },
        { name: 'description', type: 'TEXT' },
      ]
    },
    {
      table: 'prescriptions',
      columns: [
        { name: 'prescription_id', type: 'TEXT (PK)' },
        { name: 'appointment_id', type: 'TEXT (FK)' },
        { name: 'medication_name', type: 'TEXT' },
        { name: 'dosage', type: 'TEXT' },
      ]
    }
  ],
  media: [
    {
      table: 'users',
      columns: [
        { name: 'user_id', type: 'TEXT (PK)' },
        { name: 'username', type: 'TEXT' },
        { name: 'email', type: 'TEXT' },
        { name: 'subscription_tier', type: 'TEXT' },
        { name: 'join_date', type: 'TEXT' },
      ]
    },
    {
      table: 'artists',
      columns: [
        { name: 'artist_id', type: 'TEXT (PK)' },
        { name: 'name', type: 'TEXT' },
        { name: 'genre', type: 'TEXT' },
      ]
    },
    {
      table: 'tracks',
      columns: [
        { name: 'track_id', type: 'TEXT (PK)' },
        { name: 'title', type: 'TEXT' },
        { name: 'artist_id', type: 'TEXT (FK)' },
        { name: 'duration_seconds', type: 'INTEGER' },
        { name: 'release_year', type: 'INTEGER' },
      ]
    },
    {
      table: 'playlists',
      columns: [
        { name: 'playlist_id', type: 'TEXT (PK)' },
        { name: 'user_id', type: 'TEXT (FK)' },
        { name: 'title', type: 'TEXT' },
        { name: 'is_public', type: 'BOOLEAN' },
      ]
    },
    {
      table: 'listening_history',
      columns: [
        { name: 'listen_id', type: 'TEXT (PK)' },
        { name: 'user_id', type: 'TEXT (FK)' },
        { name: 'track_id', type: 'TEXT (FK)' },
        { name: 'listened_at', type: 'TEXT' },
        { name: 'completed', type: 'BOOLEAN' },
      ]
    }
  ],
  sports: [
    {
      table: 'venues',
      columns: [
        { name: 'venue_id', type: 'TEXT (PK)' },
        { name: 'name', type: 'TEXT' },
        { name: 'city', type: 'TEXT' },
        { name: 'capacity', type: 'INTEGER' },
      ]
    },
    {
      table: 'teams',
      columns: [
        { name: 'team_id', type: 'TEXT (PK)' },
        { name: 'name', type: 'TEXT' },
        { name: 'city', type: 'TEXT' },
        { name: 'founded_year', type: 'INTEGER' },
      ]
    },
    {
      table: 'players',
      columns: [
        { name: 'player_id', type: 'TEXT (PK)' },
        { name: 'team_id', type: 'TEXT (FK)' },
        { name: 'first_name', type: 'TEXT' },
        { name: 'last_name', type: 'TEXT' },
        { name: 'position', type: 'TEXT' },
        { name: 'jersey_number', type: 'INTEGER' },
      ]
    },
    {
      table: 'matches',
      columns: [
        { name: 'match_id', type: 'TEXT (PK)' },
        { name: 'home_team_id', type: 'TEXT (FK)' },
        { name: 'away_team_id', type: 'TEXT (FK)' },
        { name: 'venue_id', type: 'TEXT (FK)' },
        { name: 'match_date', type: 'TEXT' },
        { name: 'home_score', type: 'INTEGER' },
        { name: 'away_score', type: 'INTEGER' },
      ]
    },
    {
      table: 'stats_log',
      columns: [
        { name: 'stat_id', type: 'TEXT (PK)' },
        { name: 'match_id', type: 'TEXT (FK)' },
        { name: 'player_id', type: 'TEXT (FK)' },
        { name: 'goals', type: 'INTEGER' },
        { name: 'assists', type: 'INTEGER' },
        { name: 'minutes_played', type: 'INTEGER' },
        { name: 'yellow_cards', type: 'INTEGER' },
        { name: 'red_cards', type: 'INTEGER' },
      ]
    }
  ],
  aviation: [
    {
      table: 'airports',
      columns: [
        { name: 'airport_id', type: 'TEXT (PK)' },
        { name: 'name', type: 'TEXT' },
        { name: 'city', type: 'TEXT' },
        { name: 'country', type: 'TEXT' },
        { name: 'timezone', type: 'TEXT' },
      ]
    },
    {
      table: 'aircraft',
      columns: [
        { name: 'aircraft_id', type: 'TEXT (PK)' },
        { name: 'model', type: 'TEXT' },
        { name: 'capacity', type: 'INTEGER' },
        { name: 'status', type: 'TEXT' },
      ]
    },
    {
      table: 'flights',
      columns: [
        { name: 'flight_id', type: 'TEXT (PK)' },
        { name: 'aircraft_id', type: 'TEXT (FK)' },
        { name: 'departure_airport_id', type: 'TEXT (FK)' },
        { name: 'arrival_airport_id', type: 'TEXT (FK)' },
        { name: 'scheduled_departure', type: 'TEXT' },
        { name: 'scheduled_arrival', type: 'TEXT' },
      ]
    },
    {
      table: 'flight_status_history',
      columns: [
        { name: 'status_id', type: 'TEXT (PK)' },
        { name: 'flight_id', type: 'TEXT (FK)' },
        { name: 'status', type: 'TEXT' },
        { name: 'timestamp', type: 'TEXT' },
      ]
    },
    {
      table: 'crew_assignments',
      columns: [
        { name: 'assignment_id', type: 'TEXT (PK)' },
        { name: 'flight_id', type: 'TEXT (FK)' },
        { name: 'employee_id', type: 'TEXT' },
        { name: 'role', type: 'TEXT' },
      ]
    }
  ],
  real_estate: [
    {
      table: 'neighborhoods',
      columns: [
        { name: 'neighborhood_id', type: 'INTEGER (PK)' },
        { name: 'neighborhood_name', type: 'TEXT' },
        { name: 'min_latitude', type: 'DECIMAL(9,6)' },
        { name: 'max_latitude', type: 'DECIMAL(9,6)' },
        { name: 'min_longitude', type: 'DECIMAL(9,6)' },
        { name: 'max_longitude', type: 'DECIMAL(9,6)' },
        { name: 'boundary_wkt', type: 'TEXT' },
      ]
    },
    {
      table: 'environmental_zones',
      columns: [
        { name: 'zone_id', type: 'INTEGER (PK)' },
        { name: 'zone_type', type: 'TEXT' },
        { name: 'boundary_wkt', type: 'TEXT' },
      ]
    },
    {
      table: 'properties',
      columns: [
        { name: 'property_id', type: 'INTEGER (PK)' },
        { name: 'address', type: 'TEXT' },
        { name: 'price', type: 'DECIMAL' },
        { name: 'bedrooms', type: 'INTEGER' },
        { name: 'latitude', type: 'DECIMAL(9,6)' },
        { name: 'longitude', type: 'DECIMAL(9,6)' },
      ]
    }
  ],
  human_resources: [
    {
      table: 'departments',
      columns: [
        { name: 'department_id', type: 'INTEGER (PK)' },
        { name: 'name', type: 'TEXT' },
        { name: 'budget', type: 'REAL' }
      ]
    },
    {
      table: 'stores',
      columns: [
        { name: 'store_id', type: 'INTEGER (PK)' },
        { name: 'location_city', type: 'TEXT' },
        { name: 'store_manager_id', type: 'INTEGER (FK)' }
      ]
    },
    {
      table: 'employees',
      columns: [
        { name: 'employee_id', type: 'INTEGER (PK)' },
        { name: 'first_name', type: 'TEXT' },
        { name: 'last_name', type: 'TEXT' },
        { name: 'hire_date', type: 'TEXT' },
        { name: 'department_id', type: 'INTEGER (FK)' },
        { name: 'store_id', type: 'INTEGER (FK)' },
        { name: 'title', type: 'TEXT' },
        { name: 'employment_type', type: 'TEXT' },
        { name: 'pay_type', type: 'TEXT' }
      ]
    },
    {
      table: 'payrolls',
      columns: [
        { name: 'payroll_id', type: 'INTEGER (PK)' },
        { name: 'employee_id', type: 'INTEGER (FK)' },
        { name: 'salary', type: 'REAL' },
        { name: 'hourly_rate', type: 'REAL' },
        { name: 'bonus', type: 'REAL' },
        { name: 'pay_period', type: 'TEXT' }
      ]
    },
    {
      table: 'performance_reviews',
      columns: [
        { name: 'review_id', type: 'INTEGER (PK)' },
        { name: 'employee_id', type: 'INTEGER (FK)' },
        { name: 'rating', type: 'INTEGER' },
        { name: 'review_date', type: 'TEXT' }
      ]
    }
  ]
};

export default function ReferenceSheet({ isOpen, onClose, activeDomain = 'business' }: ReferenceSheetProps) {
  const currentSchema = DOMAIN_SCHEMAS[activeDomain] || DOMAIN_SCHEMAS['business'];
  const [viewMode, setViewMode] = useState<'list' | 'erd'>('list');

  const nodes = useMemo(() => {
    return currentSchema.map((tableData, idx) => ({
      id: tableData.table,
      type: 'table',
      position: { x: (idx % 3) * 320 + 20, y: Math.floor(idx / 3) * 200 + 20 },
      data: tableData
    }));
  }, [currentSchema]);

  const edges = useMemo(() => {
    const initialEdges: any[] = [];
    currentSchema.forEach(tableData => {
      tableData.columns.forEach(col => {
        if (!col.type.includes('(FK)')) return;
        let targetPK = col.name;
        if (col.name === 'user') targetPK = 'user_id';
        if (col.name === 'product_ordered') targetPK = 'product_id';
        if (col.name === 'home_team_id' || col.name === 'away_team_id') targetPK = 'team_id';
        if (col.name === 'departure_airport_id' || col.name === 'arrival_airport_id') targetPK = 'airport_id';
        if (col.name === 'store_manager_id') targetPK = 'employee_id';
        
        let targetTable = null;
        for (const t of currentSchema) {
          if (t.columns.some(c => c.name === targetPK && c.type.includes('(PK)'))) {
            targetTable = t.table;
            break;
          }
        }
        if (!targetTable) return;
        
        initialEdges.push({
          id: `${tableData.table}-${col.name}-to-${targetTable}`,
          source: tableData.table,
          sourceHandle: col.name,
          target: targetTable,
          targetHandle: targetPK,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#10b981', strokeWidth: 1.5 },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
        });
      });
    });
    return initialEdges;
  }, [currentSchema]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 pt-20"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 inset-x-0 bg-gray-50 dark:bg-zinc-900 rounded-t-3xl shadow-2xl z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-gray-50/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 z-10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">SQL Reference</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg flex items-center">
                   <button
                     onClick={() => setViewMode('list')}
                     className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                     title="List View"
                   >
                     <LayoutList className="w-4 h-4" />
                   </button>
                   <button
                     onClick={() => setViewMode('erd')}
                     className={`p-1.5 rounded-md transition-colors ${viewMode === 'erd' ? 'bg-white dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                     title="Visual ERD View"
                   >
                     <Network className="w-4 h-4" />
                   </button>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-zinc-500 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                  id="close-ref-sheet"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 pb-12 min-h-[50vh]">
              {viewMode === 'list' ? (
                <section>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                    <Table className="w-4 h-4" /> Database Schema
                  </h4>
                  <div className="space-y-4">
                    {currentSchema.map((tableData, idx) => (
                      <div key={idx} className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-gray-200 dark:border-zinc-700">
                        <div className="border-b border-gray-100 dark:border-zinc-700/50 pb-2 mb-3">
                          <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                            <Table className="w-3.5 h-3.5 text-indigo-500" />
                            {tableData.table}
                          </p>
                        </div>
                        <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                          {tableData.columns.map((col, cIdx) => (
                            <li key={cIdx} className="flex justify-between">
                              <span>{col.name}</span> <span className="font-mono text-indigo-500">{col.type}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                 <section className="h-full flex flex-col">
                   <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2 shrink-0">
                      <Network className="w-4 h-4" /> Entity-Relationship Diagram (ERD)
                   </h4>
                   
                   <div className="w-full h-[600px] bg-zinc-100 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden">
                      <ReactFlowProvider>
                         <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodeTypes={nodeTypes}
                            fitView
                            attributionPosition="bottom-right"
                         >
                            <Background color="#94a3b8" gap={16} />
                            <Controls />
                         </ReactFlow>
                      </ReactFlowProvider>
                   </div>
                   
                   <div className="flex gap-4 items-center justify-center mt-4 text-xs shrink-0">
                      <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400"><div className="w-2 h-2 rounded-full bg-amber-500" /> Primary Key (PK)</div>
                      <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Foreign Key (FK)</div>
                   </div>
                </section>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
