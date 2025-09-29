import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    apiKey: "",
    accChartSetting: {
      time: 1,
      point: 15,
    },
    ItemsChartSetting: [{ time: 1, point: 15 }],
    darkMode: false,
  },
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
    setAccChartSetting: (state, action) => {
      state.accChartSetting = { ...state.accChartSetting, ...action.payload };
    },
    setItemsChartSetting: (state, action) => {
      const index = Object.keys(action.payload)[0];
      const newSetting = action.payload[index];
      const copy = [...state.ItemsChartSetting];
    
      // 배열 길이보다 index가 크면 빈 객체 채워줌 1,2,3페이지말고 4페이지 부터 쓸때 필요
      while (copy.length <= index) {
        copy.push({});
      }
    
      copy[index] = { ...copy[index], ...newSetting }; // 병합 or 덮어쓰기
      state.ItemsChartSetting = copy;
      localStorage.setItem("ItemsChartSetting", JSON.stringify(copy));
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },

  },
});

export const { setApiKey, setAccChartSetting, setItemsChartSetting, toggleDarkMode, setDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;