import { QueryFunction, QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'

type BaseExtended<TData = unknown> =
  | { data: TData; status: 'success'; isLoading: false; isSuccess: true }
  | { data: undefined; status: 'loading'; isLoading: true; isSuccess: false }

export type BaseUseSuspenseQueryResult<TExtended extends BaseExtended = BaseExtended> = Omit<
  UseQueryResult,
  'data' | 'status' | 'error' | 'isLoading' | 'isError' | 'isFetching'
> &
  TExtended

export type UseSuspenseQueryResultOnSuccess<TData> = BaseUseSuspenseQueryResult<{
  data: TData
  isLoading: false
  isSuccess: true
  status: 'success'
}>
export type UseSuspenseQueryResultOnLoading = BaseUseSuspenseQueryResult<{
  data: undefined
  isLoading: true
  isSuccess: false
  status: 'loading'
}>

export type UseSuspenseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'suspense' | 'queryKey' | 'queryFn'>

export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'>
): UseSuspenseQueryResultOnSuccess<TData>
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'> & {
    enabled?: true
  }
): UseSuspenseQueryResultOnSuccess<TData>
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'> & {
    enabled: false
  }
): UseSuspenseQueryResultOnLoading
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseSuspenseQueryResultOnSuccess<TData> | UseSuspenseQueryResultOnLoading
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) {
  return useQuery(queryKey, queryFn, {
    ...options,
    suspense: true,
  }) as BaseUseSuspenseQueryResult<BaseExtended<TData>>
}
