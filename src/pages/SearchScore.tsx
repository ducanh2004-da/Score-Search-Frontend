import React, { useState } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { scoreService } from '../api/score.service';

export default function SearchScore() {
  const [sbd, setSbd] = useState('');
  const [scoreData, setScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setScoreData(null);

    if (sbd.trim().length !== 8) {
      setError("Vui lòng nhập đúng số báo danh gồm 8 chữ số.");
      return;
    }

    setLoading(true);
    try {
      const result = await scoreService.getScoreBySbd(sbd);
      if (result.isSuccess && result.score.length > 0) {
        setScoreData(result.score[0]);
      } else {
        setError(result.message || "Không tìm thấy dữ liệu điểm thi.");
      }
    } catch (err: any) {
      setError(err.message || "Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tra cứu điểm thi THPT</h2>
      
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Nhập số báo danh (VD: 01000001)..."
          value={sbd}
          onChange={(e) => setSbd(e.target.value)}
          className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#2E4F42] focus:border-transparent outline-none transition-all"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-[#2E4F42] text-white px-6 md:px-8 py-3 rounded-2xl hover:bg-[#1f362d] flex items-center gap-2 transition-colors disabled:opacity-70"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
          <span className="hidden md:inline">{loading ? 'Đang tìm...' : 'Tra cứu'}</span>
        </button>
      </form>

      {/* Hiển thị lỗi */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl mb-6">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Bảng điểm */}
      {scoreData && (
        <div className="animate-fade-in-up">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Kết quả của SBD: <span className="text-[#2E4F42]">{scoreData.sbd}</span>
          </h3>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Toán', 'Văn', 'Ngoại Ngữ', 'Mã NN', 'Vật Lý', 'Hóa Học', 'Sinh Học', 'Lịch Sử', 'Địa Lý', 'GDCD'].map(subj => (
                      <th key={subj} className="px-6 py-4 font-semibold tracking-wider">{subj}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.toan ?? '-'}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.ngu_van ?? '-'}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.ngoai_ngu ?? '-'}</td>
                    <td className="px-6 py-4 text-gray-500">{scoreData.ma_ngoai_ngu ?? '-'}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.vat_li ?? '-'}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.hoa_hoc ?? '-'}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.sinh_hoc ?? '-'}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.lich_su ?? '-'}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.dia_li ?? '-'}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{scoreData.gdcd ?? '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}