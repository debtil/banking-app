/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // nome abreviado do dia da semana (ex.: 'seg')
    month: "short", // nome abreviado do mês (ex.: 'out')
    day: "numeric", // dia do mês (ex.: '25')
    hour: "numeric", // hora (ex.: '8')
    minute: "numeric", // minuto (ex.: '30')
    hour12: false, // use 24-hour clock (padrão no Brasil)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // nome abreviado do dia da semana (ex.: 'seg')
    year: "numeric", // ano (ex.: '2023')
    month: "2-digit", // mês com 2 dígitos (ex.: '10')
    day: "2-digit", // dia com 2 dígitos (ex.: '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // nome abreviado do mês (ex.: 'out')
    year: "numeric", // ano (ex.: '2023')
    day: "numeric", // dia do mês (ex.: '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // hora (ex.: '8')
    minute: "numeric", // minuto (ex.: '30')
    hour12: false, // use 24-hour clock (padrão no Brasil)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "pt-BR",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "pt-BR",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "pt-BR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "pt-BR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Itera sobre cada transação
  transactions &&
    transactions.forEach((transaction) => {
      // Extrai a categoria da transação
      const category = transaction.category;

      // Se a categoria existe no objeto categoryCounts, incrementa seu contador
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Caso contrário, inicializa o contador em 1
        categoryCounts[category] = 1;
      }

      // Incrementa o contador total
      totalCount++;
    });

  // Converte o objeto categoryCounts em um array de objetos
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Ordena o array aggregatedCategories por contagem em ordem decrescente
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Divide a string URL por '/'
  const parts = url.split("/");

  // Extrai a última parte, que representa o ID do cliente
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processando" : "Sucesso";
};
