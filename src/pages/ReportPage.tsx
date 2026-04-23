import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';
import { scoreService } from '../api/score.service';

export default function ReportPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await scoreService.getReportStats();
        if (result.isSuccess) {
          setData(result.stat);
        } else {
          setError(result.message);
        }
      } catch (err: any) {
        setError("Không thể tải phổ điểm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-[500px]">
        <Loader2 size={40} className="animate-spin text-[#2E4F42] mb-4" />
        <p className="text-gray-500 font-medium">Đang tính toán phổ điểm toàn quốc...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 flex items-center gap-3 text-red-600">
        <AlertCircle /> <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 h-[600px] flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Phổ Điểm Các Môn Thi</h2>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="subject" tick={{ fill: '#4B5563', fontWeight: 500 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
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
  );
}