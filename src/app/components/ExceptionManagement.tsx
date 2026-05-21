import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, XCircle, Zap, Eye, ThumbsUp, ThumbsDown, Bot, User, FileText, TrendingUp } from 'lucide-react';

const exceptions = [
  {
    id: 'EXC-8842',
    type: 'variance',
    severity: 'high',
    sku: 'SKU-882',
    product: 'Control Panel Unit',
    detected: '2m ago',
    issue: 'Physical count variance detected',
    expected: 240,
    actual: 228,
    variance: -12,
    location: 'D-14-B-12',
    confidence: 94,
    aiResolution: 'Adjust inventory count to 228 units. Variance within acceptable threshold (5%).',
    auditTrail: ['System count: 240', 'Physical count: 228', 'Variance: -12 (-5%)'],
    status: 'pending',
  },
  {
    id: 'EXC-8841',
    type: 'discrepancy',
    severity: 'medium',
    sku: 'SKU-1923',
    product: 'Hydraulic Pump Assembly',
    detected: '8m ago',
    issue: 'Location mismatch',
    expected: 'C-12-A-04',
    actual: 'C-12-A-06',
    location: 'C-12',
    confidence: 88,
    aiResolution: 'Update location to C-12-A-06. Last scan confirmed new location.',
    auditTrail: ['Expected: C-12-A-04', 'Scanned: C-12-A-06', 'Last movement: 15m ago'],
    status: 'pending',
  },
  {
    id: 'EXC-8840',
    type: 'quality',
    severity: 'critical',
    sku: 'SKU-5612',
    product: 'Sensor Module Kit',
    detected: '12m ago',
    issue: 'Damaged goods detected',
    damaged: 8,
    location: 'B-14-C-18',
    confidence: 96,
    aiResolution: 'Quarantine 8 units. Create RMA for Vendor C. Reorder recommended.',
    auditTrail: ['Inspection flagged 8 units', 'Photos captured', 'Vendor C notified'],
    status: 'escalated',
  },
  {
    id: 'EXC-8839',
    type: 'cycle-count',
    severity: 'low',
    sku: 'SKU-2847',
    product: 'Industrial Bearing Set',
    detected: '18m ago',
    issue: 'Minor count variance',
    expected: 1240,
    actual: 1238,
    variance: -2,
    location: 'D-14-A-08',
    confidence: 92,
    aiResolution: 'Auto-adjust count to 1238. Variance < 1%, within tolerance.',
    auditTrail: ['Cycle count: 1238', 'System count: 1240', 'Variance: -2 (-0.16%)'],
    status: 'auto-resolved',
  },
];

const autoResolvedStats = {
  total: 142,
  variance: 87,
  location: 34,
  duplicate: 21,
  confidence: 96,
};

const bulkActions = [
  { id: 1, name: 'Auto-resolve low-risk exceptions', count: 23, risk: 'low' },
  { id: 2, name: 'Approve all AI recommendations', count: 18, risk: 'medium' },
  { id: 3, name: 'Export audit report', count: null, risk: null },
];

export default function ExceptionManagement() {
  const [selectedExceptions, setSelectedExceptions] = useState<string[]>([]);
  const [expandedException, setExpandedException] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'escalated' | 'auto-resolved'>('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const toggleException = (id: string) => {
    setSelectedExceptions((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedException(expandedException === id ? null : id);
  };

  const filteredExceptions = exceptions.filter((exc) => filter === 'all' || exc.status === filter);

  return (
    <div className="size-full overflow-auto bg-slate-100">
      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl">
            <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="size-9 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">Approve AI Resolution?</h3>
            <p className="text-slate-600 text-center mb-6">
              AI recommends resolving {selectedExceptions.length} exception(s) with 94% average confidence.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 px-4 py-3 border-2 border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl font-semibold transition-colors"
              >
                Review First
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedExceptions([]);
                }}
                className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
              >
                Approve & Execute
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Zap className="size-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Autonomous Exception Management</h2>
                <p className="text-slate-300 text-sm mt-1">AI-powered anomaly detection and automated reconciliation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-emerald-400 font-medium">AI Active</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-4">
          <StatCard icon={AlertTriangle} label="Pending Review" value="18" color="amber" />
          <StatCard icon={XCircle} label="Escalated" value="3" color="rose" />
          <StatCard icon={CheckCircle2} label="Auto-Resolved Today" value="142" color="emerald" />
          <StatCard icon={TrendingUp} label="Avg Confidence" value="94%" color="blue" />
          <StatCard icon={Clock} label="Avg Resolution" value="2.4m" color="violet" />
        </div>

        {/* Auto-Resolved Summary */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Bot className="size-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {autoResolvedStats.total} Low-Risk Discrepancies Auto-Resolved
                </h3>
                <p className="text-slate-700 mt-1">
                  AI autonomously reconciled exceptions with {autoResolvedStats.confidence}% average confidence
                </p>
                <div className="flex gap-6 mt-3 text-sm">
                  <span className="text-slate-600">Variance: <strong className="text-slate-900">{autoResolvedStats.variance}</strong></span>
                  <span className="text-slate-600">Location: <strong className="text-slate-900">{autoResolvedStats.location}</strong></span>
                  <span className="text-slate-600">Duplicate: <strong className="text-slate-900">{autoResolvedStats.duplicate}</strong></span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors">
              View Audit Log
            </button>
          </div>
        </div>

        {/* Filters & Bulk Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All Exceptions
            </FilterButton>
            <FilterButton active={filter === 'pending'} onClick={() => setFilter('pending')}>
              Pending ({exceptions.filter((e) => e.status === 'pending').length})
            </FilterButton>
            <FilterButton active={filter === 'escalated'} onClick={() => setFilter('escalated')}>
              Escalated ({exceptions.filter((e) => e.status === 'escalated').length})
            </FilterButton>
            <FilterButton active={filter === 'auto-resolved'} onClick={() => setFilter('auto-resolved')}>
              Auto-Resolved ({exceptions.filter((e) => e.status === 'auto-resolved').length})
            </FilterButton>
          </div>

          {selectedExceptions.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-sm">{selectedExceptions.length} selected</span>
              <button
                onClick={() => setShowApprovalModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Approve AI Resolutions
              </button>
              <button
                onClick={() => setSelectedExceptions([])}
                className="px-4 py-2 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg font-medium transition-colors text-sm"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>

        {/* Exceptions List */}
        <div className="space-y-3">
          {filteredExceptions.map((exception) => (
            <div
              key={exception.id}
              className={`bg-white border-2 rounded-xl transition-all ${
                selectedExceptions.includes(exception.id)
                  ? 'border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedExceptions.includes(exception.id)}
                    onChange={() => toggleException(exception.id)}
                    className="mt-1.5 size-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  {/* Exception Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          exception.severity === 'critical'
                            ? 'bg-rose-100'
                            : exception.severity === 'high'
                            ? 'bg-orange-100'
                            : exception.severity === 'medium'
                            ? 'bg-amber-100'
                            : 'bg-blue-100'
                        }`}>
                          {exception.status === 'auto-resolved' ? (
                            <CheckCircle2 className={`size-5 ${
                              exception.severity === 'critical'
                                ? 'text-rose-600'
                                : exception.severity === 'high'
                                ? 'text-orange-600'
                                : exception.severity === 'medium'
                                ? 'text-amber-600'
                                : 'text-blue-600'
                            }`} />
                          ) : (
                            <AlertTriangle className={`size-5 ${
                              exception.severity === 'critical'
                                ? 'text-rose-600'
                                : exception.severity === 'high'
                                ? 'text-orange-600'
                                : exception.severity === 'medium'
                                ? 'text-amber-600'
                                : 'text-blue-600'
                            }`} />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-900">{exception.id}</h3>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-600">{exception.product}</span>
                            <span className="text-sm font-mono text-slate-500">({exception.sku})</span>
                          </div>
                          <p className="text-slate-700">{exception.issue}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          exception.status === 'auto-resolved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : exception.status === 'escalated'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {exception.status === 'auto-resolved' ? 'AUTO-RESOLVED' : exception.status === 'escalated' ? 'ESCALATED' : 'PENDING'}
                        </span>
                        <span className="text-xs text-slate-500">{exception.detected}</span>
                      </div>
                    </div>

                    {/* Exception Details Grid */}
                    <div className="grid grid-cols-4 gap-4 bg-slate-50 rounded-lg p-4 mb-3">
                      {exception.variance !== undefined && (
                        <>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">Expected</p>
                            <p className="font-semibold text-slate-900">{exception.expected}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">Actual</p>
                            <p className="font-semibold text-slate-900">{exception.actual}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">Variance</p>
                            <p className={`font-semibold ${exception.variance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                              {exception.variance}
                            </p>
                          </div>
                        </>
                      )}
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Location</p>
                        <p className="font-semibold text-slate-900">{exception.location}</p>
                      </div>
                    </div>

                    {/* AI Resolution */}
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Bot className="size-5 text-violet-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-violet-900 text-sm">AI Recommendation</h4>
                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="text-violet-600">Confidence:</span>
                              <span className="font-bold text-violet-900">{exception.confidence}%</span>
                            </div>
                          </div>
                          <p className="text-violet-800 text-sm mb-3">{exception.aiResolution}</p>

                          {exception.status === 'pending' && (
                            <div className="flex gap-2">
                              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                                <ThumbsUp className="size-4" />
                                Approve
                              </button>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-300 hover:border-rose-400 text-rose-600 rounded-lg text-sm font-medium transition-colors">
                                <ThumbsDown className="size-4" />
                                Reject
                              </button>
                              <button
                                onClick={() => toggleExpanded(exception.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-violet-300 hover:border-violet-400 text-violet-600 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Eye className="size-4" />
                                {expandedException === exception.id ? 'Hide' : 'View'} Audit Trail
                              </button>
                            </div>
                          )}

                          {exception.status === 'escalated' && (
                            <div className="flex items-center gap-2 text-sm">
                              <User className="size-4 text-rose-600" />
                              <span className="text-rose-700 font-medium">Human review required</span>
                            </div>
                          )}

                          {exception.status === 'auto-resolved' && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="size-4 text-emerald-600" />
                              <span className="text-emerald-700 font-medium">Automatically resolved by AI</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Audit Trail - Expanded */}
                    {expandedException === exception.id && (
                      <div className="mt-3 bg-slate-900 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="size-4 text-slate-400" />
                          <h5 className="font-semibold text-white text-sm">Audit Trail</h5>
                        </div>
                        <div className="space-y-2">
                          {exception.auditTrail.map((entry, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm">
                              <div className="size-1.5 rounded-full bg-slate-500 mt-2"></div>
                              <span className="text-slate-300">{entry}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-slate-900 mb-4">Bulk Operations</h3>
          <div className="grid grid-cols-3 gap-4">
            {bulkActions.map((action) => (
              <button
                key={action.id}
                className="p-4 border-2 border-slate-200 hover:border-blue-400 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Zap className="size-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  {action.count && (
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                      {action.count}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-900">{action.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  const colorClasses = {
    amber: 'from-amber-500 to-orange-600',
    rose: 'from-rose-500 to-pink-600',
    emerald: 'from-emerald-500 to-teal-600',
    blue: 'from-blue-500 to-indigo-600',
    violet: 'from-violet-500 to-purple-600',
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow border border-slate-200">
      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} mb-2`}>
        <Icon className="size-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
        active
          ? 'bg-slate-900 text-white shadow-lg'
          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
      }`}
    >
      {children}
    </button>
  );
}
