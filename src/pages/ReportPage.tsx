import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';
import { scoreService } from '../api/score.service';

const MOCK_DATA = [
  { subject: 'Toán Học', level1: 180000, level2: 500000, level3: 250000, level4: 80000 },
  { subject: 'Vật Lí', level1: 90000, level2: 140000, level3: 80000, level4: 20000 },
  { subject: 'Hóa Học', level1: 85000, level2: 135000, level3: 75000, level4: 18000 },
  { subject: 'Ngữ Văn', level1: 380000, level2: 510000, level3: 140000, level4: 15000 },
];

export default function ReportPage() {
  const [data, setData] = useState<any[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await scoreService.getReportStats();
        if (result.isSuccess && result.stat) {
          setData(result.stat);
        } else {
          setError(result.message);
        }
      } catch (err: any) {
        setError("Can not retrieve score spectrum. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          Score spectrum of all subject
          {loading && <Loader2 size={20} className="animate-spin text-gray-400" />}
        </h2>
      </div>

      {error && !loading ? (
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-red-100 flex items-center gap-3 text-red-600">
          <AlertCircle /> <p>{error}</p>
        </div>
      ) : (
        <div className={`w-full overflow-x-auto transition-opacity duration-500 pb-4 ${loading ? 'opacity-60' : 'opacity-100'}`}>
          <div className="min-w-[500px] md:min-w-full h-[400px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fill: '#4B5563', fontWeight: 500, fontSize: 14 }} 
                  axisLine={false} 
                  tickLine={false} 
                  interval={0} 
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF', fontSize: 13 }} 
                  axisLine={false} 
                  tickLine={false} 
                  width={60}
                />
                <Tooltip
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="level1" name="Giỏi (≥ 8)" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="level2" name="Khá (6 - 7.9)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="level3" name="TB (4 - 5.9)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="level4" name="Yếu (< 4)" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}