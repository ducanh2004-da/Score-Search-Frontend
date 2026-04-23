import { useEffect, useState } from 'react';
import { Trophy, Loader2, AlertCircle, Medal } from 'lucide-react';
import { scoreService } from '../api/score.service';

export default function Top10Page() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const result = await scoreService.getTop10GroupA();
        if (result.isSuccess) {
          setStudents(result.student);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Không thể tải danh sách bảng vàng.");
      } finally {
        setLoading(false);
      }
    };
    fetchTop10();
  }, []);

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-yellow-100 rounded-2xl text-yellow-600">
          <Trophy size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Bảng Vàng - Top 10 Khối A</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={32} className="animate-spin text-[#2E4F42]" />
        </div>
      ) : error ? (
        <div className="text-red-500 flex items-center gap-2 bg-red-50 p-4 rounded-xl">
          <AlertCircle /> {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 w-24 text-center">Xếp hạng</th>
                <th className="px-6 py-4">Số Báo Danh</th>
                <th className="px-6 py-4 text-right">Tổng Điểm (Toán-Lý-Hóa)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student, index) => (
                <tr key={student.sbd} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-center">
                    {index === 0 ? <Medal className="mx-auto text-yellow-500" size={28} /> :
                     index === 1 ? <Medal className="mx-auto text-gray-400" size={26} /> :
                     index === 2 ? <Medal className="mx-auto text-amber-600" size={24} /> :
                     <span className="text-lg font-bold text-gray-400">{index + 1}</span>}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700 text-lg">{student.sbd}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 font-bold text-lg group-hover:bg-green-100 transition-colors">
                      {student.totalScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}