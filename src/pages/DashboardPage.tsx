import { Search, Users, TrendingUp, Award, ArrowRight, BarChart3, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const stats = [
    { label: 'Total Candidates', value: '1,024,342', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'National Top Scorer', value: '29.75', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Average Score', value: '18.5', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#2E4F42] rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to G-Scores</h2>
            <p className="text-gray-200 text-sm md:text-base">
              Fast and accurate national high school exam score lookup and spectrum analysis system.
            </p>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="w-full md:w-auto px-6 py-3 bg-white text-[#2E4F42] font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Search size={20} />
            Search now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shrink-0`}>
                <Icon size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div 
          onClick={() => navigate('/report')}
          className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm cursor-pointer group hover:border-green-200 transition-all flex flex-col h-full justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600 mb-4 group-hover:bg-[#EAEFEA] group-hover:text-[#2E4F42] transition-colors">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Score Spectrum Analysis</h3>
            <p className="text-gray-500 text-sm mb-6">
              View detailed score distribution charts for each subject to evaluate this year's competition level.
            </p>
          </div>
          <div className="flex items-center text-[#2E4F42] font-semibold gap-2 group-hover:gap-3 transition-all">
            View details <ArrowRight size={18} />
          </div>
        </div>

        <div 
          onClick={() => navigate('/top10')}
          className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm cursor-pointer group hover:border-yellow-200 transition-all flex flex-col h-full justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600 mb-4 group-hover:bg-yellow-50 group-hover:text-yellow-600 transition-colors">
              <Trophy size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Golden Board - Top 10 Group A</h3>
            <p className="text-gray-500 text-sm mb-6">
              Honoring the candidates with the highest total scores in Math, Physics, and Chemistry nationwide.
            </p>
          </div>
          <div className="flex items-center text-yellow-600 font-semibold gap-2 group-hover:gap-3 transition-all">
            View list <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}