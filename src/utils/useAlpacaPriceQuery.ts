import dayjs from "dayjs";
import { useQuery } from "react-query";

const ALPACA_PRICE_QUERY_KEY = 'alpacaPriceQuery';

const fetcher = () => fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=alpaca-finance&per_page=250').then(
  (res) => res.json(),
)

const QUERY_CONFIG = { staleTime: dayjs.duration({ minutes: 1 }).asMilliseconds() }

const useAlpacaPriceQuery = () => useQuery<{ current_price: number; image: string }[]>(
  ALPACA_PRICE_QUERY_KEY,
  fetcher,
  QUERY_CONFIG,
);

export default useAlpacaPriceQuery