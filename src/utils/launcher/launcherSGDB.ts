import { fetch } from "zx";
import { ISGDBResponse } from "../../model";

const steamGridDB = "https://www.steamgriddb.com/api/v2";

export const fetchLaunchers = async (name: string): Promise<ISGDBResponse> => {
  return fetch(`${steamGridDB}/search/autocomplete/${name}`, {
    headers: { Authorization: "Bearer 4b651cdf8aaa440703430ad6c1a318fd" },
  })
    .then((response) => response.json())
    .then((response) => response as ISGDBResponse);
};

export const fetchLauncherIcon = async (id: number | string) => {
  return fetch(`${steamGridDB}/icons/game/${id}`, {
    headers: { Authorization: "Bearer 4b651cdf8aaa440703430ad6c1a318fd" },
  })
    .then((response) => response.json())
    .then((response) => response as ISGDBResponse);
};
