import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Brain, Zap, Package, Warehouse, DollarSign, Activity } from 'lucide-react';

const inventoryTrendData = [
  { month: 'Jan', accuracy: 96.5, fillRate: 94.2, value: 18.2 },
  { month: 'Feb', accuracy: 97.1, fillRate: 95.1, value: 19.5 },
  { month: 'Mar', accuracy: 97.8, fillRate: 95.8, value: 20.1 },
  { month: 'Apr', accuracy: 98.2, fillRate: 96.4, value: 21.8 },
];

const warehousePerformance = [
  { name: 'Dallas', efficiency: 88, utilization: 92, accuracy: 98 },
  { name: 'Chicago', efficiency: 94, utilization: 87, accuracy: 97 },
  { name: 'Seattle', efficiency: 91, utilization: 89, accuracy: 99 },
  { name: 'Atlanta', efficiency: 85, utilization: 95, accuracy: 96 },
];

const stockoutRisks = [
  { sku: 'SKU-2847', product: 'Industrial Bearing Set', risk: 'High', eta: '2 days', demand: '+340%', location: 'Dallas, Chicago' },
  { sku: 'SKU-1923', product: 'Hydraulic Pump Assembly', risk: 'Medium', eta: '5 days', demand: '+125%', location: 'Seattle' },
  { sku: 'SKU-5612', product: 'Control Panel Unit', risk: 'High', eta: '3 days', demand: '+280%', location: 'Atlanta, Dallas' },
  { sku: 'SKU-8834', product: 'Sensor Module Kit', risk: 'Low', eta: '7 days', demand: '+45%', location: 'Chicago' },
];

const aiInsights = [
  {
    id: 1,
    type: 'critical',
    title: 'Dallas Warehouse Efficiency Drop',
    message: 'AI detected 12% efficiency decrease in Dallas warehouse over past 48 hours. Root cause analysis suggests congestion in Zone D-14.',
    action: 'Redistribute 18% of picking workload to Zone D-12',
    confidence: 94,
    impact: 'High',
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Inventory Optimization Opportunity',
    message: 'ML model identifies $2.4M in aging inventory eligible for markdown or redistribution to high-demand markets.',
    action: 'Execute automated redistribution plan',
    confidence: 91,
    impact: 'Medium',
  },
  {
    id: 3,
    type: 'prediction',
    title: 'Southeast Demand Surge Predicted',
    message: 'Predictive analytics forecasts 18% demand increase in Southeast region within next 10 days based on market signals.',
    action: 'Increase safety stock by 14% in Atlanta',
    confidence: 88,
    impact: 'High',
  },
];

export default function AiCommandCenter({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  return (
    <div className={`size-full overflow-auto ${
      theme === 'dark'
        ? 'bg-slate-950'
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50'
    }`}>
      <div className="p-6 space-y-6">
        {/* AI Copilot Banner */}
        <div className={`bg-gradient-to-r from-violet-600 to-blue-600 border ${
          theme === 'dark' ? 'border-violet-500/30' : 'border-violet-300'
        } ${theme === 'dark' ? 'rounded-xl p-4' : 'rounded-2xl p-5 shadow-xl'} backdrop-blur-xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${theme === 'dark' ? 'size-10 rounded-lg' : 'size-12 rounded-xl'} bg-white/20 backdrop-blur flex items-center justify-center`}>
                <Brain className={`${theme === 'dark' ? 'size-5' : 'size-6'} text-white`} />
              </div>
              <div>
                <h3 className={`text-white ${theme === 'dark' ? 'font-semibold' : 'font-bold text-lg'}`}>AI Operations Copilot Active</h3>
                <p className={`${theme === 'dark' ? 'text-violet-300' : 'text-violet-100'} text-sm`}>Monitoring 4 warehouses • 18,492 SKUs • 3 active recommendations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`size-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-300'} animate-pulse`}></div>
              <span className={`${theme === 'dark' ? 'text-emerald-400' : 'text-white'} text-sm font-medium`}>Live</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-5 gap-4">
          <MetricCard
            title="Inventory Accuracy"
            value="98.2%"
            change="+0.4%"
            trend="up"
            icon={Package}
            color="blue"
            theme={theme}
            onHover={() => setHoveredMetric('accuracy')}
            isHovered={hoveredMetric === 'accuracy'}
          />
          <MetricCard
            title="Fill Rate"
            value="96.4%"
            change="+0.6%"
            trend="up"
            icon={Activity}
            color="emerald"
            theme={theme}
            onHover={() => setHoveredMetric('fillrate')}
            isHovered={hoveredMetric === 'fillrate'}
          />
          <MetricCard
            title="Aging Inventory"
            value="$2.4M"
            change="-8.2%"
            trend="down"
            icon={DollarSign}
            color="amber"
            theme={theme}
            onHover={() => setHoveredMetric('aging')}
            isHovered={hoveredMetric === 'aging'}
          />
          <MetricCard
            title="Forecast Confidence"
            value="91%"
            change="+3%"
            trend="up"
            icon={Zap}
            color="violet"
            theme={theme}
            onHover={() => setHoveredMetric('forecast')}
            isHovered={hoveredMetric === 'forecast'}
          />
          <MetricCard
            title="Active Alerts"
            value="23"
            change="+12"
            trend="up"
            icon={AlertTriangle}
            color="rose"
            theme={theme}
            onHover={() => setHoveredMetric('alerts')}
            isHovered={hoveredMetric === 'alerts'}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* AI Insights Panel */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'} text-lg`}>AI-Generated Insights</h2>
              <button className={`text-sm font-medium transition-colors ${
                theme === 'dark' ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'
              }`}>
                View All Recommendations →
              </button>
            </div>

            <div className="space-y-3">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  onClick={() => setSelectedInsight(insight.id === selectedInsight ? null : insight.id)}
                  className={`${
                    theme === 'dark'
                      ? 'bg-slate-900/50 border'
                      : 'bg-white border-2 shadow-sm hover:shadow-md'
                  } ${theme === 'dark' ? 'rounded-xl p-4' : 'rounded-2xl p-5'} cursor-pointer transition-all ${
                    insight.type === 'critical'
                      ? theme === 'dark' ? 'border-rose-500/40 hover:border-rose-500/60' : 'border-rose-200 hover:border-rose-300'
                      : insight.type === 'opportunity'
                      ? theme === 'dark' ? 'border-emerald-500/40 hover:border-emerald-500/60' : 'border-emerald-200 hover:border-emerald-300'
                      : theme === 'dark' ? 'border-blue-500/40 hover:border-blue-500/60' : 'border-blue-200 hover:border-blue-300'
                  } ${selectedInsight === insight.id ? `ring-2 ${theme === 'dark' ? 'ring-violet-500/50' : 'ring-violet-500 shadow-lg'}` : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {insight.type === 'critical' && (
                          <AlertTriangle className={`${theme === 'dark' ? 'size-4 text-rose-400' : 'size-5 text-rose-600'}`} />
                        )}
                        {insight.type === 'opportunity' && (
                          <TrendingUp className={`${theme === 'dark' ? 'size-4 text-emerald-400' : 'size-5 text-emerald-600'}`} />
                        )}
                        {insight.type === 'prediction' && (
                          <Brain className={`${theme === 'dark' ? 'size-4 text-blue-400' : 'size-5 text-blue-600'}`} />
                        )}
                        <h3 className={`${theme === 'dark' ? 'text-white font-medium' : 'text-slate-900 font-semibold'}`}>{insight.title}</h3>
                      </div>
                      <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-sm mb-3`}>{insight.message}</p>

                      {selectedInsight === insight.id && (
                        <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} space-y-3`}>
                          <div className={`${theme === 'dark' ? 'bg-slate-950/50' : 'bg-slate-50 border border-slate-200'} rounded-xl p-3`}>
                            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'} mb-1`}>Recommended Action</p>
                            <p className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-sm`}>{insight.action}</p>
                          </div>
                          <div className="flex gap-3">
                            <button className={`flex-1 px-4 py-2 bg-violet-600 ${theme === 'dark' ? 'hover:bg-violet-500' : 'hover:bg-violet-700'} text-white ${theme === 'dark' ? 'rounded-lg' : 'rounded-xl shadow-sm'} text-sm font-${theme === 'dark' ? 'medium' : 'semibold'} transition-colors`}>
                              Approve & Execute
                            </button>
                            <button className={`px-4 py-2 border ${theme === 'dark' ? 'border-slate-700 hover:border-slate-600 text-slate-300' : 'border-2 border-slate-300 hover:border-slate-400 text-slate-700'} ${theme === 'dark' ? 'rounded-lg' : 'rounded-xl'} text-sm font-${theme === 'dark' ? 'medium' : 'semibold'} transition-colors`}>
                              Review Details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 text-right">
                      <div className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500 font-medium'} mb-1`}>Confidence</div>
                      <div className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold text-lg'}`}>{insight.confidence}%</div>
                      <div className={`text-xs mt-1 ${theme === 'dark' ? '' : 'font-semibold'} ${
                        insight.impact === 'High'
                          ? theme === 'dark' ? 'text-rose-400' : 'text-rose-600'
                          : theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                      }`}>
                        {insight.impact} Impact
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warehouse Performance Radar */}
          <div className="space-y-4">
            <h2 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'} text-lg`}>Warehouse Health</h2>
            <div className={`${theme === 'dark' ? 'bg-slate-900/50 border border-slate-800 rounded-xl' : 'bg-white border-2 border-slate-200 rounded-2xl shadow-sm'} p-6`}>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={warehousePerformance}>
                  <PolarGrid stroke={theme === 'dark' ? '#475569' : '#cbd5e1'} />
                  <PolarAngleAxis dataKey="name" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Radar key="efficiency-radar" name="Efficiency" dataKey="efficiency" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Radar key="accuracy-radar" name="Accuracy" dataKey="accuracy" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-2">
                {warehousePerformance.map((wh) => (
                  <div key={wh.name} className="flex items-center justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}>{wh.name}</span>
                    <span className={`font-${theme === 'dark' ? 'medium' : 'semibold'} ${
                      wh.efficiency < 90
                        ? theme === 'dark' ? 'text-rose-400' : 'text-rose-600'
                        : theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      {wh.efficiency}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stockout Risk Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'} text-lg`}>Predictive Stockout Analysis</h2>
            <div className="flex items-center gap-2 text-sm">
              <div className={`size-2 rounded-full ${theme === 'dark' ? 'bg-rose-400' : 'bg-rose-500'}`}></div>
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>High Risk</span>
              <div className={`size-2 rounded-full ${theme === 'dark' ? 'bg-amber-400' : 'bg-amber-500'} ml-3`}></div>
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Medium Risk</span>
              <div className={`size-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'} ml-3`}></div>
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Low Risk</span>
            </div>
          </div>

          <div className={`${theme === 'dark' ? 'bg-slate-900/50 border border-slate-800 rounded-xl' : 'bg-white border-2 border-slate-200 rounded-2xl shadow-sm'} overflow-hidden`}>
            <table className="w-full">
              <thead>
                <tr className={`${theme === 'dark' ? 'border-b border-slate-800' : 'border-b-2 border-slate-200 bg-slate-50'}`}>
                  <th className={`text-left p-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'} text-sm font-${theme === 'dark' ? 'medium' : 'semibold'}`}>SKU</th>
                  <th className={`text-left p-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'} text-sm font-${theme === 'dark' ? 'medium' : 'semibold'}`}>Product</th>
                  <th className={`text-left p-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'} text-sm font-${theme === 'dark' ? 'medium' : 'semibold'}`}>Risk Level</th>
                  <th className={`text-left p-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'} text-sm font-${theme === 'dark' ? 'medium' : 'semibold'}`}>Replenish ETA</th>
                  <th className={`text-left p-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'} text-sm font-${theme === 'dark' ? 'medium' : 'semibold'}`}>Demand Spike</th>
                  <th className={`text-left p-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'} text-sm font-${theme === 'dark' ? 'medium' : 'semibold'}`}>Affected Locations</th>
                </tr>
              </thead>
              <tbody>
                {stockoutRisks.map((item, idx) => (
                  <tr key={idx} className={`${theme === 'dark' ? 'border-b border-slate-800/50 hover:bg-slate-800/30' : 'border-b border-slate-100 hover:bg-slate-50'} transition-colors`}>
                    <td className={`p-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900 font-semibold'} font-mono text-sm`}>{item.sku}</td>
                    <td className={`p-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} text-sm`}>{item.product}</td>
                    <td className="p-4">
                      <span className={`${theme === 'dark' ? 'px-2 py-1' : 'px-2.5 py-1'} rounded-full text-xs font-${theme === 'dark' ? 'medium' : 'semibold'} ${
                        item.risk === 'High'
                          ? theme === 'dark' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-rose-100 text-rose-700 border border-rose-200'
                          : item.risk === 'Medium'
                          ? theme === 'dark' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-amber-100 text-amber-700 border border-amber-200'
                          : theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {item.risk}
                      </span>
                    </td>
                    <td className={`p-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} text-sm`}>{item.eta}</td>
                    <td className={`p-4 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600 font-bold'} font-semibold text-sm`}>{item.demand}</td>
                    <td className={`p-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-sm`}>{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Performance Chart */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'} text-lg`}>Inventory Performance Trends</h2>
            <div className={`${theme === 'dark' ? 'bg-slate-900/50 border border-slate-800 rounded-xl' : 'bg-white border-2 border-slate-200 rounded-2xl shadow-sm'} p-6`}>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={inventoryTrendData}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0', borderRadius: theme === 'dark' ? '8px' : '12px' }}
                    labelStyle={{ color: theme === 'dark' ? '#e2e8f0' : '#0f172a' }}
                  />
                  <Area key="accuracy-area" type="monotone" dataKey="accuracy" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAccuracy)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className={`${theme === 'dark' ? 'text-white font-semibold' : 'text-slate-900 font-bold'} text-lg`}>Inventory Value by Month ($M)</h2>
            <div className={`${theme === 'dark' ? 'bg-slate-900/50 border border-slate-800 rounded-xl' : 'bg-white border-2 border-slate-200 rounded-2xl shadow-sm'} p-6`}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={inventoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0', borderRadius: theme === 'dark' ? '8px' : '12px' }}
                    labelStyle={{ color: theme === 'dark' ? '#e2e8f0' : '#0f172a' }}
                  />
                  <Bar key="value-bar" dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  theme?: 'light' | 'dark';
  onHover: () => void;
  isHovered: boolean;
}

function MetricCard({ title, value, change, trend, icon: Icon, color, theme = 'light', onHover, isHovered }: MetricCardProps) {
  const colorClassesLight = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    emerald: 'from-emerald-50 to-emerald-100 border-emerald-200',
    amber: 'from-amber-50 to-amber-100 border-amber-200',
    violet: 'from-violet-50 to-violet-100 border-violet-200',
    rose: 'from-rose-50 to-rose-100 border-rose-200',
  };

  const colorClassesDark = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
    violet: 'from-violet-500/20 to-violet-600/20 border-violet-500/30',
    rose: 'from-rose-500/20 to-rose-600/20 border-rose-500/30',
  };

  const iconColorClasses = theme === 'dark' ? {
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    violet: 'text-violet-400',
    rose: 'text-rose-400',
  } : {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    violet: 'text-violet-600',
    rose: 'text-rose-600',
  };

  const colorClasses = theme === 'dark' ? colorClassesDark : colorClassesLight;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={() => {}}
      className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border${theme === 'dark' ? '' : '-2'} ${theme === 'dark' ? 'rounded-xl' : 'rounded-2xl'} p-4 transition-all cursor-pointer ${theme === 'dark' ? '' : 'shadow-sm'} ${
        isHovered ? `scale-105 shadow-lg${theme === 'dark' ? '' : ''}` : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className={`size-5 ${iconColorClasses[color as keyof typeof iconColorClasses]}`} />
        <div className={`flex items-center gap-1 text-xs font-semibold ${
          trend === 'up'
            ? theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            : theme === 'dark' ? 'text-rose-400' : 'text-rose-600'
        }`}>
          {trend === 'up' ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {change}
        </div>
      </div>
      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-1`}>{value}</div>
      <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>{title}</div>
    </div>
  );
}
