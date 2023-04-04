import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CalendarHeatmapData, HorizonChartData } from '../types';

export const d3DataApi = createApi({
  reducerPath: 'd3DataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.npoint.io/' }),
  endpoints: (builder) => ({
    getCalendarHeatmapData: builder.query<CalendarHeatmapData[], string>({
      query: () => `ce53189b59faa1e922ff`,
      transformResponse: (response: CalendarHeatmapData[], meta, arg) => {
        return response;
      },
    }),
    getHorizonChartData: builder.query<HorizonChartData[], string>({
      query: () => `565ec3d1cfa8f3d509d9`,
      transformResponse: (response: HorizonChartData[], meta, arg) => {
        return response;
      },
    }),
  }),
});

export const { useGetCalendarHeatmapDataQuery, useGetHorizonChartDataQuery } =
  d3DataApi;
