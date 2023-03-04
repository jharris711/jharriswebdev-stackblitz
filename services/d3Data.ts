import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const d3DataApi = createApi({
  reducerPath: 'd3DataApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.npoint.io/' }),
  endpoints: (builder) => ({
    getCalendarHeatmapData: builder.query<any, string>({
      query: () => `ce53189b59faa1e922ff`,
      transformResponse: (response: { data: any }, meta, arg) => {
        return response;
      },
    }),
    getHorizonChartData: builder.query<any, string>({
      query: () => `565ec3d1cfa8f3d509d9`,
      transformResponse: (response: { data: any }, meta, arg) => {
        return response;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCalendarHeatmapDataQuery, useGetHorizonChartDataQuery } =
  d3DataApi;
