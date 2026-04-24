import { useEffect, useState } from 'react';
import { Trophy, Loader2, AlertCircle, Medal } from 'lucide-react';
import { scoreService } from '../api/score.service';

const MOCK_DATA = [
  { sbd: '26020938', totalScore: 29.5 },
  { sbd: '26009943', totalScore: 29.2 },
  { sbd: '19016615', totalScore: 29.0 },
  { sbd: '55006046', totalScore: 28.8 },
  { sbd: '19013166', totalScore: 28.5 },
  { sbd: '26014736', totalScore: 28.4 },
  { sbd: '28035804', totalScore: 28.1 },
];

export default function Top10Page() {
  const [students, setStudents] = useState<any[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const result = await scoreService.getTop10GroupA();
        if (result.isSuccess && result.student) {
          setStudents(result.student);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Can not find list of successful candidates");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTop10();
  }, []);

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 max-w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="p-3 bg-yellow-100 rounded-2xl text-yellow-600 shrink-0">
          <Trophy size={28} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
          Golden Board - Top 10 Group A Rankings
          {loading && <Loader2 size={20} className="animate-spin text-gray-400" />}
        </h2>
      </div>

      {error && !loading ? (
        <div className="text-red-500 flex items-center gap-2 bg-red-50 p-4 rounded-xl">
          <AlertCircle /> {error}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 shadow-sm w-full overflow-hidden">
          <div className={`overflow-x-auto transition-opacity duration-500 ${loading ? 'opacity-60' : 'opacity-100'}`}>
            <table className="w-full text-left min-w-[320px]">
              <thead className="bg-gray-50 text-gray-500 text-xs sm:text-sm uppercase font-semibold">
                <tr>
                  <th className="px-3 py-3 md:px-6 md:py-4 w-16 md:w-24 text-center whitespace-nowrap">
                    Rankings
                  </th>
                  <th className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">
                    ID number
                  </th>
                  <th className="px-3 py-3 md:px-6 md:py-4 text-right whitespace-nowrap">
                    Total score <span className="hidden sm:inline">(Toán-Lý-Hóa)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student, index) => (
                  <tr key={student.sbd} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-3 py-3 md:px-6 md:py-4 text-center">
                      {index === 0 ? <Medal className="mx-auto text-yellow-500" size={24} /> :
                        index === 1 ? <Medal className="mx-auto text-gray-400" size={24} /> :
                          index === 2 ? <Medal className="mx-auto text-amber-600" size={24} /> :
                            <span className="text-base md:text-lg font-bold text-gray-400">{index + 1}</span>}
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 font-medium text-gray-700 text-base md:text-lg">
                      {student.sbd}
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 text-right">
                      <span className="inline-flex items-center justify-center px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-green-50 text-green-700 font-bold text-base md:text-lg group-hover:bg-green-100 transition-colors whitespace-nowrap">
                        {student.totalScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}