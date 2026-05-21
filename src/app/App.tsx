import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Sun, Moon } from 'lucide-react';
import AiCommandCenter from './components/AiCommandCenter';
import WarehouseDigitalTwin from './components/WarehouseDigitalTwin';
import MobileOperator from './components/MobileOperator';
import SupplyChainPrediction from './components/SupplyChainPrediction';
import ExceptionManagement from './components/ExceptionManagement';

export default function App() {
  const [activeTab, setActiveTab] = useState('command-center');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`size-full ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="size-full flex flex-col">
        {/* Navigation Header */}
        <div className={`${theme === 'dark' ? 'border-b border-slate-800 bg-slate-900/50' : 'border-b-2 border-slate-200 bg-white/80'} backdrop-blur-xl shadow-sm`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h1 className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold text-xl`}>Nexus IMS</h1>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-xs font-medium`}>Enterprise Inventory Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-medium`}>North America Region</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} font-semibold`}>All Systems Operational</p>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2.5 rounded-xl transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-amber-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
            </div>
          </div>

          <TabsList className="px-6 flex gap-1">
            <TabsTrigger
              value="command-center"
              className={`px-5 py-3 text-sm font-semibold transition-all rounded-t-xl ${
                theme === 'dark'
                  ? 'data-[state=active]:bg-slate-950 data-[state=active]:text-white text-slate-400 hover:text-slate-200'
                  : 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-slate-50 data-[state=active]:to-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-slate-600 hover:text-slate-900'
              }`}
            >
              AI Command Center
            </TabsTrigger>
            <TabsTrigger
              value="digital-twin"
              className={`px-5 py-3 text-sm font-semibold transition-all rounded-t-xl ${
                theme === 'dark'
                  ? 'data-[state=active]:bg-slate-950 data-[state=active]:text-white text-slate-400 hover:text-slate-200'
                  : 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-slate-50 data-[state=active]:to-cyan-50 data-[state=active]:text-cyan-700 data-[state=active]:border-b-2 data-[state=active]:border-cyan-600 text-slate-600 hover:text-slate-900'
              }`}
            >
              Digital Twin
            </TabsTrigger>
            <TabsTrigger
              value="operator"
              className={`px-5 py-3 text-sm font-semibold transition-all rounded-t-xl ${
                theme === 'dark'
                  ? 'data-[state=active]:bg-slate-950 data-[state=active]:text-white text-slate-400 hover:text-slate-200'
                  : 'data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-slate-600 hover:text-slate-900'
              }`}
            >
              Operator
            </TabsTrigger>
            <TabsTrigger
              value="prediction"
              className={`px-5 py-3 text-sm font-semibold transition-all rounded-t-xl ${
                theme === 'dark'
                  ? 'data-[state=active]:bg-slate-950 data-[state=active]:text-white text-slate-400 hover:text-slate-200'
                  : 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-slate-50 data-[state=active]:to-blue-50 data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 text-slate-600 hover:text-slate-900'
              }`}
            >
              Prediction
            </TabsTrigger>
            <TabsTrigger
              value="exceptions"
              className={`px-5 py-3 text-sm font-semibold transition-all rounded-t-xl ${
                theme === 'dark'
                  ? 'data-[state=active]:bg-slate-950 data-[state=active]:text-white text-slate-400 hover:text-slate-200'
                  : 'data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-slate-700 text-slate-600 hover:text-slate-900'
              }`}
            >
              Exceptions
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="command-center" className="size-full m-0">
            <AiCommandCenter theme={theme} />
          </TabsContent>
          <TabsContent value="digital-twin" className="size-full m-0">
            <WarehouseDigitalTwin theme={theme} />
          </TabsContent>
          <TabsContent value="operator" className="size-full m-0">
            <MobileOperator />
          </TabsContent>
          <TabsContent value="prediction" className="size-full m-0">
            <SupplyChainPrediction />
          </TabsContent>
          <TabsContent value="exceptions" className="size-full m-0">
            <ExceptionManagement />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
