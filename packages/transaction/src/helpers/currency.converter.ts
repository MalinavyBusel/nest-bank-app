import axios from 'axios';

export async function convertCurrency(
  from: string,
  to: string,
  amount: number,
): Promise<number> {
  if (from === to) {
    return amount;
  }

  const apiKey = '7ea7d246381d5de05fcfdb937f33ec82ad7f8794';
  const apiUrl = 'https://api.getgeoapi.com/v2/currency/convert';
  const url = `${apiUrl}?amount=${amount}&from=${from}&to=${to}&api_key=${apiKey}&format=json`;
  const { data } = await axios.get(url);

  return Number(data?.rates[to]?.rate_for_amount);
}
