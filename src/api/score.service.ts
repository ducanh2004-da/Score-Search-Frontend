import apiConfig from "../configs/api.config";

export const scoreService = {
  // 1. API Tra cứu điểm theo SBD
  // Thêm tham số sbd (string) vào hàm
  getScoreBySbd: async (sbd: string) => {
    const response = await apiConfig.post('', {
      query: `
        query GetScore($data: SearchScore!) {
          getScoreBySbd(data: $data) {
            isSuccess
            message
            score {
              sbd vat_li toan sinh_hoc ngu_van ngoai_ngu ma_ngoai_ngu lich_su hoa_hoc gdcd dia_li
            }
          }
        }
      `,
      // Truyền đúng cấu trúc object mà GraphQL yêu cầu
      variables: { 
        data: { sbd: sbd } 
      }
    });
    
    // axios tự bọc kết quả trong field "data", GraphQL cũng bọc trong "data"
    return response.data.data.getScoreBySbd;
  },

  // 2. API Lấy thống kê phổ điểm
  getReportStats: async () => {
    const response = await apiConfig.post('', {
      query: `
        query GetReport {
          getSubjectLevelReport {
            isSuccess
            message
            stat {
              subject level1 level2 level3 level4
            }
          }
        }
      `
    });
    return response.data.data.getSubjectLevelReport;
  },

  // 3. API Lấy Top 10 Khối A
  getTop10GroupA: async () => {
    const response = await apiConfig.post('', {
      query: `
        query GetTop10 {
          getTop10GroupA {
            isSuccess
            message
            student {
              sbd totalScore
            }
          }
        }
      `
    });
    return response.data.data.getTop10GroupA;
  }
};