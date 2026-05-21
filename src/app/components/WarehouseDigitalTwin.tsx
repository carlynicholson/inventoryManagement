import { useState, useEffect } from 'react';
import { Users, Truck, Clock, AlertCircle, Navigation, Radio, Zap, MapPin, Package } from 'lucide-react';

const zones = [
  { id: 'A-12', x: 10, y: 10, w: 120, h: 80, temp: 72, congestion: 'low', activity: 12 },
  { id: 'A-14', x: 140, y: 10, w: 120, h: 80, temp: 71, congestion: 'low', activity: 8 },
  { id: 'B-12', x: 10, y: 100, w: 120, h: 80, temp: 74, congestion: 'medium', activity: 28 },
  { id: 'B-14', x: 140, y: 100, w: 120, h: 80, temp: 73, congestion: 'medium', activity: 22 },
  { id: 'C-12', x: 10, y: 190, w: 120, h: 80, temp: 75, congestion: 'high', activity: 42 },
  { id: 'C-14', x: 140, y: 190, w: 120, h: 80, temp: 76, congestion: 'low', activity: 6 },
  { id: 'D-12', x: 270, y: 10, w: 120, h: 80, temp: 70, congestion: 'low', activity: 14 },
  { id: 'D-14', x: 270, y: 100, w: 120, h: 170, temp: 78, congestion: 'critical', activity: 56 },
];

const activePickers = [
  { id: 'P-042', name: 'Johnson, M.', zone: 'D-14', tasks: 8, efficiency: 94, x: 310, y: 150 },
  { id: 'P-118', name: 'Chen, L.', zone: 'C-12', tasks: 12, efficiency: 98, x: 50, y: 220 },
  { id: 'P-091', name: 'Rodriguez, A.', zone: 'B-12', tasks: 6, efficiency: 91, x: 60, y: 130 },
  { id: 'P-203', name: 'Williams, T.', zone: 'A-14', tasks: 10, efficiency: 96, x: 180, y: 40 },
];

const forklifts = [
  { id: 'FL-08', zone: 'D-14', status: 'active', battery: 76, x: 330, y: 180 },
  { id: 'FL-12', zone: 'B-14', status: 'active', battery: 92, x: 180, y: 130 },
  { id: 'FL-19', zone: 'C-12', status: 'charging', battery: 24, x: 80, y: 240 },
];

const dockDoors = [
  { id: 'Dock 1', status: 'loading', truck: 'TRK-1847', eta: '12 min', x: 420, y: 30 },
  { id: 'Dock 2', status: 'idle', truck: null, eta: null, x: 420, y: 90 },
  { id: 'Dock 3', status: 'unloading', truck: 'TRK-2901', eta: '8 min', x: 420, y: 150 },
  { id: 'Dock 4', status: 'loading', truck: 'TRK-3342', eta: '15 min', x: 420, y: 210 },
];

export default function WarehouseDigitalTwin({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedPicker, setSelectedPicker] = useState<string | null>(null);
  const [liveUpdate, setLiveUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdate((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const selectedZoneData = zones.find((z) => z.id === selectedZone);
  const selectedPickerData = activePickers.find((p) => p.id === selectedPicker);

  return (
    <div className={`size-full overflow-auto ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50'
    }`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className={`bg-gradient-to-r from-cyan-600 to-blue-600 border ${
          theme === 'dark' ? 'border-cyan-500/30 rounded-xl p-4' : 'border-cyan-300 rounded-2xl p-5 shadow-xl'
        } backdrop-blur-xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${theme === 'dark' ? 'size-10 rounded-lg' : 'size-12 rounded-xl'} bg-white/20 backdrop-blur flex items-center justify-center`}>
                <Radio className={`${theme === 'dark' ? 'size-5' : 'size-6'} text-white`} />
              </div>
              <div>
                <h3 className={`text-white ${theme === 'dark' ? 'font-semibold' : 'font-bold text-lg'}`}>Dallas Warehouse - Live Digital Twin</h3>
                <p className={`${theme === 'dark' ? 'text-cyan-300' : 'text-cyan-100'} text-sm`}>Real-time spatial operations monitoring • Last sync: {liveUpdate}s ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-cyan-100'}`}>Operational Status</div>
                <div className={`${theme === 'dark' ? 'text-emerald-400 font-semibold' : 'text-white font-bold'}`}>Active</div>
              </div>
              <div className={`size-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-300'} animate-pulse`}></div>
            </div>
          </div>
        </div>

        {/* Live Metrics Bar */}
        <div className="grid grid-cols-6 gap-4">
          <LiveMetric icon={Users} label="Active Pickers" value="84" trend="+2" color="cyan" theme={theme} />
          <LiveMetric icon={Truck} label="Forklifts Active" value="22" trend="-1" color="blue" theme={theme} />
          <LiveMetric icon={Package} label="Orders/hr" value="1,248" trend="+124" color="violet" theme={theme} />
          <LiveMetric icon={Clock} label="Avg Pick Time" value="2.4m" trend="-0.2m" color="emerald" theme={theme} />
          <LiveMetric icon={AlertCircle} label="Dock Delays" value="3" trend="+1" color="amber" theme={theme} />
          <LiveMetric icon={Zap} label="Zone Efficiency" value="89%" trend="+3%" color="rose" theme={theme} />
        </div>

        {/* Main Warehouse Map */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'} text-lg`}>Warehouse Floor Map</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className={`size-3 rounded ${theme === 'dark' ? 'bg-emerald-500/50' : 'bg-emerald-500'}`}></div>
                  <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Low</span>
                  <div className={`size-3 rounded ${theme === 'dark' ? 'bg-amber-500/50' : 'bg-amber-500'} ml-2`}></div>
                  <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Medium</span>
                  <div className={`size-3 rounded ${theme === 'dark' ? 'bg-rose-500/50' : 'bg-rose-500'} ml-2`}></div>
                  <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>High</span>
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-slate-900 border border-slate-800 rounded-xl' : 'bg-white border-2 border-slate-200 rounded-2xl shadow-sm'} p-6 relative overflow-hidden`}>
              {/* Grid Background */}
              <svg className="w-full" viewBox="0 0 500 300" style={{ height: '500px' }}>
                {/* Grid Lines */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="500" height="300" fill="url(#grid)" />

                {/* Zones */}
                {zones.map((zone) => {
                  const congestionColor =
                    zone.congestion === 'critical'
                      ? '#ef4444'
                      : zone.congestion === 'high'
                      ? '#f97316'
                      : zone.congestion === 'medium'
                      ? '#f59e0b'
                      : '#10b981';

                  return (
                    <g
                      key={zone.id}
                      onClick={() => setSelectedZone(zone.id)}
                      className="cursor-pointer transition-all"
                      style={{ transition: 'all 0.2s' }}
                    >
                      <rect
                        x={zone.x}
                        y={zone.y}
                        width={zone.w}
                        height={zone.h}
                        fill={congestionColor}
                        fillOpacity={selectedZone === zone.id ? 0.4 : 0.15}
                        stroke={congestionColor}
                        strokeWidth={selectedZone === zone.id ? 2 : 1}
                        strokeOpacity={0.5}
                        rx={4}
                      />
                      <text
                        x={zone.x + 10}
                        y={zone.y + 20}
                        fill={theme === 'dark' ? '#e2e8f0' : '#0f172a'}
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {zone.id}
                      </text>
                      <text
                        x={zone.x + 10}
                        y={zone.y + 35}
                        fill={theme === 'dark' ? '#94a3b8' : '#475569'}
                        fontSize="10"
                      >
                        {zone.activity} active
                      </text>
                    </g>
                  );
                })}

                {/* Pickers */}
                {activePickers.map((picker) => (
                  <g
                    key={picker.id}
                    onClick={() => setSelectedPicker(picker.id)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={picker.x}
                      cy={picker.y}
                      r={selectedPicker === picker.id ? 8 : 6}
                      fill="#06b6d4"
                      stroke="#0891b2"
                      strokeWidth={2}
                      opacity={0.9}
                    >
                      <animate
                        attributeName="r"
                        values={selectedPicker === picker.id ? '8;10;8' : '6;8;6'}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x={picker.x + 12}
                      y={picker.y + 4}
                      fill="#06b6d4"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {picker.id}
                    </text>
                  </g>
                ))}

                {/* Forklifts */}
                {forklifts.map((forklift) => (
                  <g key={forklift.id}>
                    <rect
                      x={forklift.x - 6}
                      y={forklift.y - 6}
                      width={12}
                      height={12}
                      fill={forklift.status === 'charging' ? '#64748b' : '#8b5cf6'}
                      stroke={forklift.status === 'charging' ? '#475569' : '#7c3aed'}
                      strokeWidth={2}
                      rx={2}
                    />
                    <text
                      x={forklift.x + 10}
                      y={forklift.y + 4}
                      fill="#a78bfa"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {forklift.id}
                    </text>
                  </g>
                ))}

                {/* Dock Doors */}
                {dockDoors.map((dock) => (
                  <g key={dock.id}>
                    <rect
                      x={dock.x}
                      y={dock.y}
                      width={60}
                      height={30}
                      fill={
                        dock.status === 'loading'
                          ? '#10b981'
                          : dock.status === 'unloading'
                          ? '#f59e0b'
                          : '#334155'
                      }
                      fillOpacity={0.3}
                      stroke={
                        dock.status === 'loading'
                          ? '#059669'
                          : dock.status === 'unloading'
                          ? '#d97706'
                          : '#475569'
                      }
                      strokeWidth={2}
                      rx={4}
                    />
                    <text
                      x={dock.x + 8}
                      y={dock.y + 18}
                      fill="#e2e8f0"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {dock.id}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Legend */}
              <div className={`absolute bottom-6 left-6 ${
                theme === 'dark'
                  ? 'bg-slate-950/80 backdrop-blur border border-slate-700 rounded-lg'
                  : 'bg-white/95 backdrop-blur border-2 border-slate-200 rounded-xl shadow-lg'
              } p-3 space-y-2`}>
                <div className="flex items-center gap-2 text-xs">
                  <div className="size-3 rounded-full bg-cyan-500"></div>
                  <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700 font-medium'}>Picker</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="size-3 rounded bg-violet-500"></div>
                  <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700 font-medium'}>Forklift</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="size-3 rounded bg-emerald-500"></div>
                  <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700 font-medium'}>Dock Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="space-y-4">
            <h2 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'} text-lg`}>Live Telemetry</h2>

            {selectedZoneData && (
              <div className={`${
                theme === 'dark'
                  ? 'bg-slate-900 border border-cyan-500/30 rounded-xl'
                  : 'bg-white border-2 border-cyan-300 rounded-2xl shadow-sm'
              } p-4 space-y-3`}>
                <div className="flex items-center justify-between">
                  <h3 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'}`}>Zone {selectedZoneData.id}</h3>
                  <button
                    onClick={() => setSelectedZone(null)}
                    className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  <DetailRow label="Congestion" value={selectedZoneData.congestion.toUpperCase()} valueColor={
                    selectedZoneData.congestion === 'critical' ? 'text-rose-600' :
                    selectedZoneData.congestion === 'high' ? 'text-orange-600' :
                    selectedZoneData.congestion === 'medium' ? 'text-amber-600' : 'text-emerald-600'
                  } />
                  <DetailRow label="Active Workers" value={selectedZoneData.activity.toString()} />
                  <DetailRow label="Temperature" value={`${selectedZoneData.temp}°F`} />
                  <DetailRow label="Status" value="Operational" valueColor="text-emerald-600" />
                </div>

                <button className={`w-full px-4 py-2.5 bg-cyan-600 hover:bg-cyan-${theme === 'dark' ? '500' : '700'} text-white rounded-xl text-sm font-semibold transition-colors ${theme === 'dark' ? '' : 'shadow-sm'}`}>
                  View Zone Analytics
                </button>
              </div>
            )}

            {selectedPickerData && (
              <div className={`${
                theme === 'dark'
                  ? 'bg-slate-900 border border-cyan-500/30 rounded-xl'
                  : 'bg-white border-2 border-cyan-300 rounded-2xl shadow-sm'
              } p-4 space-y-3`}>
                <div className="flex items-center justify-between">
                  <h3 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'}`}>{selectedPickerData.id}</h3>
                  <button
                    onClick={() => setSelectedPicker(null)}
                    className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  <DetailRow label="Name" value={selectedPickerData.name} />
                  <DetailRow label="Current Zone" value={selectedPickerData.zone} />
                  <DetailRow label="Tasks Remaining" value={selectedPickerData.tasks.toString()} />
                  <DetailRow label="Efficiency" value={`${selectedPickerData.efficiency}%`} valueColor="text-emerald-600" />
                </div>

                <button className={`w-full px-4 py-2.5 bg-cyan-600 hover:bg-cyan-${theme === 'dark' ? '500' : '700'} text-white rounded-xl text-sm font-semibold transition-colors ${theme === 'dark' ? '' : 'shadow-sm'}`}>
                  Send Task
                </button>
              </div>
            )}

            {/* Dock Status */}
            <div className="space-y-3">
              <h3 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'} text-sm`}>Dock Status</h3>
              {dockDoors.map((dock) => (
                <div key={dock.id} className={`${
                  theme === 'dark'
                    ? 'bg-slate-900 border border-slate-800 rounded-lg'
                    : 'bg-white border-2 border-slate-200 rounded-xl shadow-sm'
                } p-3`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-${theme === 'dark' ? 'medium' : 'semibold'} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{dock.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-${theme === 'dark' ? 'medium' : 'semibold'} ${
                      dock.status === 'loading'
                        ? theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : dock.status === 'unloading'
                        ? theme === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700 border border-amber-200'
                        : theme === 'dark' ? 'bg-slate-500/20 text-slate-400' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {dock.status}
                    </span>
                  </div>
                  {dock.truck && (
                    <div className="text-xs space-y-1">
                      <div className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Truck: <span className={`font-semibold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`}>{dock.truck}</span></div>
                      <div className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>ETA: <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{dock.eta}</span></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className={`${theme === 'dark' ? 'bg-slate-900 border border-slate-800 rounded-xl p-4' : 'bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm'}`}>
          <h3 className={`${theme === 'dark' ? 'text-white font-semibold mb-3' : 'text-slate-900 font-bold mb-4'}`}>Live Activity Stream</h3>
          <div className="space-y-2 text-xs">
            <ActivityLog time="12:34:28" message="Picker P-042 completed order #48291 in Zone D-14" type="success" theme={theme} />
            <ActivityLog time="12:34:12" message="Forklift FL-19 entering charging bay" type="warning" theme={theme} />
            <ActivityLog time="12:33:58" message="Dock 3 unloading TRK-2901 - 8 minutes remaining" type="info" theme={theme} />
            <ActivityLog time="12:33:42" message="Zone C-12 congestion elevated to HIGH" type="alert" theme={theme} />
            <ActivityLog time="12:33:21" message="Picker P-118 efficiency at 98% - performance recognition triggered" type="success" theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveMetric({ icon: Icon, label, value, trend, color, theme = 'light' }: { icon: React.ElementType; label: string; value: string; trend: string; color: string; theme?: 'light' | 'dark' }) {
  const colorClassLight = {
    cyan: 'from-cyan-50 to-cyan-100 border-cyan-200',
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    violet: 'from-violet-50 to-violet-100 border-violet-200',
    emerald: 'from-emerald-50 to-emerald-100 border-emerald-200',
    amber: 'from-amber-50 to-amber-100 border-amber-200',
    rose: 'from-rose-50 to-rose-100 border-rose-200',
  };

  const colorClassDark = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    violet: 'from-violet-500/20 to-violet-600/20 border-violet-500/30',
    emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
    rose: 'from-rose-500/20 to-rose-600/20 border-rose-500/30',
  };

  const iconClassLight = {
    cyan: 'text-cyan-600',
    blue: 'text-blue-600',
    violet: 'text-violet-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    rose: 'text-rose-600',
  };

  const iconClassDark = {
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    violet: 'text-violet-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
  };

  const colorClass = theme === 'dark' ? colorClassDark : colorClassLight;
  const iconClass = theme === 'dark' ? iconClassDark : iconClassLight;

  return (
    <div className={`bg-gradient-to-br ${colorClass[color as keyof typeof colorClass]} border${theme === 'dark' ? '' : '-2'} ${theme === 'dark' ? 'rounded-xl' : 'rounded-2xl'} p-3 ${theme === 'dark' ? '' : 'shadow-sm'}`}>
      <Icon className={`size-4 ${iconClass[color as keyof typeof iconClass]} mb-2`} />
      <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{value}</div>
      <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>{label}</div>
      <div className={`text-xs ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600 font-semibold'} mt-1`}>{trend}</div>
    </div>
  );
}

function DetailRow({ label, value, valueColor, theme = 'light' }: { label: string; value: string; valueColor?: string; theme?: 'light' | 'dark' }) {
  const defaultColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  return (
    <div className="flex justify-between text-sm">
      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{label}</span>
      <span className={`font-semibold ${valueColor || defaultColor}`}>{value}</span>
    </div>
  );
}

function ActivityLog({ time, message, type, theme = 'light' }: { time: string; message: string; type: 'success' | 'warning' | 'info' | 'alert'; theme?: 'light' | 'dark' }) {
  const typeColorLight = {
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    info: 'text-cyan-600',
    alert: 'text-rose-600',
  };

  const typeColorDark = {
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    info: 'text-cyan-400',
    alert: 'text-rose-400',
  };

  const typeColor = theme === 'dark' ? typeColorDark : typeColorLight;

  return (
    <div className={`flex items-start gap-3 ${theme === 'dark' ? 'py-1.5' : 'py-2'} border-b ${theme === 'dark' ? 'border-slate-800/50' : 'border-slate-100'}`}>
      <span className={`${theme === 'dark' ? 'text-slate-500 font-mono' : 'text-slate-500 font-mono font-medium'}`}>{time}</span>
      <span className={`${typeColor[type]} ${theme === 'dark' ? '' : 'font-bold'}`}>•</span>
      <span className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} flex-1`}>{message}</span>
    </div>
  );
}
