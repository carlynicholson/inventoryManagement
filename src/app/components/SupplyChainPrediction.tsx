import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Zap, Globe, Package, DollarSign } from 'lucide-react';

const demandForecast = [
  { week: 'W1', actual: 12400, predicted: 12200, lower: 11800, upper: 12600 },
  { week: 'W2', actual: 13100, predicted: 13000, lower: 12500, upper: 13500 },
  { week: 'W3', actual: 14200, predicted: 14100, lower: 13600, upper: 14600 },
  { week: 'W4', actual: 15800, predicted: 15900, lower: 15300, upper: 16500 },
  { week: 'W5', actual: null, predicted: 17200, lower: 16500, upper: 17900 },
  { week: 'W6', actual: null, predicted: 18600, lower: 17800, upper: 19400 },
  { week: 'W7', actual: null, predicted: 19800, lower: 18900, upper: 20700 },
  { week: 'W8', actual: null, predicted: 21200, lower: 20100, upper: 22300 },
];

const regionalDemand = [
  { region: 'Southeast', current: 24800, predicted: 29264, change: 18, risk: 'high' },
  { region: 'Midwest', current: 18200, predicted: 19292, change: 6, risk: 'low' },
  { region: 'Northeast', current: 21500, predicted: 22145, change: 3, risk: 'low' },
  { region: 'Southwest', current: 16800, predicted: 19992, change: 19, risk: 'medium' },
  { region: 'West', current: 19600, predicted: 21168, change: 8, risk: 'medium' },
];

const supplierRisk = [
  { name: 'Vendor A', leadTime: 12, reliability: 96, cost: 92, risk: 'low', onTime: 98 },
  { name: 'Vendor B', leadTime: 18, reliability: 78, cost: 85, risk: 'high', onTime: 82 },
  { name: 'Vendor C', leadTime: 8, reliability: 94, cost: 88, risk: 'low', onTime: 95 },
  { name: 'Vendor D', leadTime: 14, reliability: 88, cost: 90, risk: 'medium', onTime: 89 },
  { name: 'Vendor E', leadTime: 21, reliability: 72, cost: 78, risk: 'high', onTime: 76 },
];

const inventoryOptimization = [
  { sku: 'SKU-2847', current: 1240, optimal: 1680, shortage: -440, safetyStock: 14, reorderPoint: 1450 },
  { sku: 'SKU-5612', current: 890, optimal: 760, surplus: 130, safetyStock: 8, reorderPoint: 680 },
  { sku: 'SKU-1923', current: 620, optimal: 940, shortage: -320, safetyStock: 12, reorderPoint: 820 },
  { sku: 'SKU-8834', current: 2140, optimal: 1980, surplus: 160, safetyStock: 18, reorderPoint: 1750 },
];

const scenarios = [
  { id: 1, name: 'Baseline', demand: 100, cost: 100, service: 96.4, selected: true },
  { id: 2, name: 'High Demand (+20%)', demand: 120, cost: 118, service: 94.2, selected: false },
  { id: 3, name: 'Supplier Delay', demand: 100, cost: 112, service: 88.6, selected: false },
  { id: 4, name: 'Optimized Safety Stock', demand: 100, cost: 94, service: 97.8, selected: false },
];

export default function SupplyChainPrediction() {
  const [selectedScenario, setSelectedScenario] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  return (
    <div className="size-full overflow-auto bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <TrendingUp className="size-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Demand Forecasting & Simulation</h2>
                <p className="text-blue-100 text-sm mt-1">Predictive analytics powered by ML models • Confidence: 91%</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Forecast Horizon</div>
              <div className="text-2xl font-bold">8 weeks</div>
            </div>
          </div>
        </div>

        {/* Key Insights Cards */}
        <div className="grid grid-cols-4 gap-4">
          <InsightCard
            icon={TrendingUp}
            title="Southeast Surge"
            value="+18%"
            subtitle="Demand increase predicted"
            color="rose"
            trend="up"
          />
          <InsightCard
            icon={AlertTriangle}
            title="Vendor B Risk"
            value="High"
            subtitle="78% reliability score"
            color="amber"
            trend="down"
          />
          <InsightCard
            icon={Target}
            title="Stockout Window"
            value="6 days"
            subtitle="SKU-2847 critical"
            color="orange"
            trend="neutral"
          />
          <InsightCard
            icon={Zap}
            title="Safety Stock"
            value="+14%"
            subtitle="Recommended adjustment"
            color="emerald"
            trend="up"
          />
        </div>

        {/* Demand Forecast Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-slate-900 font-bold text-lg">8-Week Demand Forecast</h3>
              <p className="text-slate-600 text-sm">ML-powered prediction with confidence intervals</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded bg-blue-500"></div>
                <span className="text-slate-600">Actual</span>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <div className="size-3 rounded bg-violet-500"></div>
                <span className="text-slate-600">Predicted</span>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <div className="size-3 rounded bg-violet-200"></div>
                <span className="text-slate-600">Confidence Range</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={demandForecast}>
              <defs>
                <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px' }}
              />
              <Area key="upper-band" type="monotone" dataKey="upper" stroke="none" fill="url(#confidenceBand)" />
              <Area key="lower-band" type="monotone" dataKey="lower" stroke="none" fill="url(#confidenceBand)" />
              <Line key="actual-line" type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
              <Line key="predicted-line" type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Analysis & Supplier Risk */}
        <div className="grid grid-cols-2 gap-6">
          {/* Regional Demand */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Regional Demand Analysis</h3>

            <div className="space-y-3">
              {regionalDemand.map((region) => (
                <div
                  key={region.region}
                  onClick={() => setSelectedRegion(region.region === selectedRegion ? null : region.region)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedRegion === region.region
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="size-5 text-blue-600" />
                      <span className="font-semibold text-slate-900">{region.region}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                      region.change > 10 ? 'text-rose-600' : region.change > 5 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {region.change > 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                      {region.change > 0 ? '+' : ''}{region.change}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 text-xs mb-0.5">Current</p>
                      <p className="font-semibold text-slate-900">{region.current.toLocaleString()} units</p>
                    </div>
                    <div>
                      <p className="text-slate-600 text-xs mb-0.5">Predicted</p>
                      <p className="font-semibold text-violet-600">{region.predicted.toLocaleString()} units</p>
                    </div>
                  </div>

                  {selectedRegion === region.region && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          region.risk === 'high'
                            ? 'bg-rose-100 text-rose-700'
                            : region.risk === 'medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {region.risk.toUpperCase()} RISK
                        </span>
                        <button className="ml-auto text-blue-600 text-xs font-medium hover:text-blue-700">
                          Adjust Inventory →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Supplier Risk Matrix */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Supplier Risk Assessment</h3>

            <div className="space-y-3 mb-6">
              {supplierRisk.map((supplier) => (
                <div
                  key={supplier.name}
                  onClick={() => setSelectedSupplier(supplier.name === selectedSupplier ? null : supplier.name)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedSupplier === supplier.name
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">{supplier.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      supplier.risk === 'high'
                        ? 'bg-rose-100 text-rose-700'
                        : supplier.risk === 'medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {supplier.risk.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-slate-600 mb-0.5">Lead Time</p>
                      <p className="font-semibold text-slate-900">{supplier.leadTime}d</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-0.5">On-Time</p>
                      <p className="font-semibold text-slate-900">{supplier.onTime}%</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-0.5">Reliability</p>
                      <p className="font-semibold text-slate-900">{supplier.reliability}%</p>
                    </div>
                  </div>

                  {selectedSupplier === supplier.name && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-600 mb-2">Cost Index: {supplier.cost}/100</p>
                      <button className="w-full py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-medium transition-colors">
                        View Full Analysis
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scenario Simulation */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h3 className="text-slate-900 font-bold text-lg mb-4">Scenario Simulation Engine</h3>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedScenario === scenario.id
                    ? 'border-indigo-500 bg-indigo-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h4 className="font-semibold text-slate-900 mb-3 text-sm">{scenario.name}</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Demand</span>
                    <span className="font-semibold">{scenario.demand}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cost</span>
                    <span className="font-semibold">{scenario.cost}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Service</span>
                    <span className="font-semibold text-emerald-600">{scenario.service}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-4 border border-indigo-200">
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-indigo-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">AI Recommendation</h4>
                <p className="text-indigo-800 text-sm">
                  Scenario 4 (Optimized Safety Stock) reduces costs by 6% while improving service level to 97.8%.
                  Recommended action: Increase safety stock by 14% for high-demand SKUs in Southeast region.
                </p>
                <button className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Apply Recommendation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Optimization Table */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 font-bold text-lg">Inventory Optimization Recommendations</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Export Report →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold text-sm">SKU</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold text-sm">Current Stock</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold text-sm">Optimal Stock</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold text-sm">Variance</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold text-sm">Safety Stock +%</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold text-sm">Reorder Point</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {inventoryOptimization.map((item, idx) => {
                  const variance = item.current - item.optimal;
                  const isShortage = variance < 0;

                  return (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">{item.sku}</td>
                      <td className="py-3 px-4 text-slate-700">{item.current.toLocaleString()}</td>
                      <td className="py-3 px-4 text-slate-700">{item.optimal.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${isShortage ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {variance > 0 ? '+' : ''}{variance}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">+{item.safetyStock}%</td>
                      <td className="py-3 px-4 text-slate-700">{item.reorderPoint.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <button className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          isShortage
                            ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}>
                          {isShortage ? 'Replenish' : 'Reduce'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, title, value, subtitle, color, trend }: {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}) {
  const colorClasses = {
    rose: 'from-rose-500 to-pink-600',
    amber: 'from-amber-500 to-orange-600',
    orange: 'from-orange-500 to-red-600',
    emerald: 'from-emerald-500 to-teal-600',
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200">
      <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} mb-3`}>
        <Icon className="size-5 text-white" />
      </div>
      <div className="text-sm text-slate-600 mb-1">{title}</div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </div>
  );
}
