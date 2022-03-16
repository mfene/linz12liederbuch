export default (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

export const plainTextFetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.text());
