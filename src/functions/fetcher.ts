export const fetchData = (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'Application/json'
    }
  }).then((rep) => rep.json());
};
