import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// 신규 데이터 추가시 임포트 부분
import userReducer from '@/redux/user/userSlice';
import layoutReducer from '@/redux/layout/layoutSlice';
import assetReducer from '@/redux/asset_type/assetTypeSlice';
import assetClassReducer from '@/redux/asset_class/assetClassSlice';
import assetTypeReducer from '@/redux/asset_type/assetTypeSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    layoutReducer,
    assetReducer,
    assetClassReducer,
    assetTypeReducer,
  },
});

// 밑에 부분은 걍 내비두기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;