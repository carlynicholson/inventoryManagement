import { useState } from 'react';
import { Mic, Camera, CheckCircle2, ChevronRight, MapPin, Package, Box, ScanLine, Navigation2, Clock, AlertCircle } from 'lucide-react';

const currentOrder = {
  orderNumber: '48291',
  zone: 'D-14',
  priority: 'high',
  customer: 'Acme Industries',
  totalItems: 128,
  completedItems: 86,
  estimatedTime: '12 min',
};

const pickTasks = [
  { id: 1, sku: 'SKU-2847', product: 'Industrial Bearing Set', location: 'D-14-A-08', qty: 12, status: 'completed' },
  { id: 2, sku: 'SKU-5612', product: 'Control Panel Unit', location: 'D-14-B-12', qty: 8, status: 'completed' },
  { id: 3, sku: 'SKU-1923', product: 'Hydraulic Pump Assembly', location: 'D-14-C-04', qty: 6, status: 'current' },
  { id: 4, sku: 'SKU-8834', product: 'Sensor Module Kit', location: 'D-14-C-18', qty: 24, status: 'pending' },
  { id: 5, sku: 'SKU-3421', product: 'Cable Harness Assembly', location: 'D-14-D-22', qty: 16, status: 'pending' },
];

const upcomingOrders = [
  { id: '48292', items: 64, zone: 'C-12', priority: 'medium', eta: '18 min' },
  { id: '48293', items: 42, zone: 'B-14', priority: 'low', eta: '35 min' },
  { id: '48294', items: 96, zone: 'D-14', priority: 'high', eta: '45 min' },
];

export default function MobileOperator() {
  const [scanMode, setScanMode] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(3);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCompleteTask = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentTask(currentTask + 1);
    }, 1500);
  };

  const currentTaskData = pickTasks.find((t) => t.id === currentTask);
  const completedCount = pickTasks.filter((t) => t.status === 'completed').length;
  const progressPercent = (currentOrder.completedItems / currentOrder.totalItems) * 100;

  return (
    <div className="size-full overflow-auto bg-white">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-2xl">
            <div className="size-20 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
              <CheckCircle2 className="size-12 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-900">Item Confirmed!</p>
            <p className="text-slate-600 mt-2">Moving to next item...</p>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-blue-100 text-sm mb-1">Current Order</p>
              <h1 className="text-3xl font-bold">#{currentOrder.orderNumber}</h1>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentOrder.priority === 'high'
                ? 'bg-rose-500'
                : currentOrder.priority === 'medium'
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}>
              {currentOrder.priority.toUpperCase()}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-100">Progress</span>
              <span className="font-semibold">{currentOrder.completedItems} / {currentOrder.totalItems} items</span>
            </div>
            <div className="h-3 bg-blue-800/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3">
              <MapPin className="size-5 mb-1 text-blue-200" />
              <div className="text-xs text-blue-200">Zone</div>
              <div className="font-bold text-lg">{currentOrder.zone}</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3">
              <Clock className="size-5 mb-1 text-blue-200" />
              <div className="text-xs text-blue-200">ETA</div>
              <div className="font-bold text-lg">{currentOrder.estimatedTime}</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3">
              <Package className="size-5 mb-1 text-blue-200" />
              <div className="text-xs text-blue-200">Accuracy</div>
              <div className="font-bold text-lg">99.1%</div>
            </div>
          </div>
        </div>

        {/* Current Task Card */}
        <div className="flex-1 px-6 py-6 space-y-6 overflow-auto">
          {currentTaskData && (
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {currentTask}
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-semibold">CURRENT PICK</p>
                    <p className="text-slate-500 text-sm mt-0.5">Step {currentTask} of {pickTasks.length}</p>
                  </div>
                </div>
                <Navigation2 className="size-6 text-blue-600" />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Product</p>
                  <p className="text-xl font-bold text-slate-900">{currentTaskData.product}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">SKU</p>
                    <p className="text-lg font-mono font-semibold text-slate-900">{currentTaskData.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Quantity</p>
                    <p className="text-lg font-semibold text-slate-900">{currentTaskData.qty} units</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="size-4 text-blue-600" />
                    <p className="text-sm text-slate-600">Location</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{currentTaskData.location}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setScanMode(!scanMode)}
                  className={`py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                    scanMode
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white border-2 border-blue-200 text-blue-600'
                  }`}
                >
                  <ScanLine className="size-6" />
                  Scan
                </button>
                <button
                  onClick={() => setVoiceMode(!voiceMode)}
                  className={`py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                    voiceMode
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                      : 'bg-white border-2 border-violet-200 text-violet-600'
                  }`}
                >
                  <Mic className="size-6" />
                  Voice
                </button>
              </div>

              <button
                onClick={handleCompleteTask}
                className="w-full mt-3 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl font-bold text-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-3"
              >
                <CheckCircle2 className="size-7" />
                Confirm Pick
              </button>
            </div>
          )}

          {/* Upcoming Tasks */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-3">Next Items</h3>
            <div className="space-y-2">
              {pickTasks
                .filter((task) => task.status === 'pending')
                .map((task, idx) => (
                  <div
                    key={task.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                        {task.id}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{task.product}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{task.location} • Qty: {task.qty}</p>
                      </div>
                    </div>
                    <ChevronRight className="size-5 text-slate-400" />
                  </div>
                ))}
            </div>
          </div>

          {/* AI Assistant Tip */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="size-5 text-violet-600" />
              </div>
              <div>
                <p className="font-semibold text-violet-900 text-sm mb-1">AI Tip</p>
                <p className="text-violet-800 text-sm">
                  Zone D-14-C is experiencing high traffic. Consider taking alternate path via D-14-E for faster access.
                </p>
              </div>
            </div>
          </div>

          {/* Queue Preview */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-3">Upcoming Orders</h3>
            <div className="space-y-2">
              {upcomingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">Order #{order.id}</p>
                    <p className="text-slate-600 text-sm">{order.items} items • Zone {order.zone}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded-full mb-1 ${
                      order.priority === 'high'
                        ? 'bg-rose-100 text-rose-700'
                        : order.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {order.priority}
                    </div>
                    <p className="text-slate-500 text-xs">ETA: {order.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="grid grid-cols-4 gap-2">
            <NavButton icon={Package} label="Orders" active />
            <NavButton icon={Camera} label="Scan" />
            <NavButton icon={MapPin} label="Map" />
            <NavButton icon={Box} label="Inventory" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon: Icon, label, active = false }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
      }`}
    >
      <Icon className="size-6" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
