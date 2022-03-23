export type Theme = {
  light: "light";
  dark: "dark";
};

export interface ICountry {
  capital: Array<string>;
  flags: {png: string; svg: string};
  name: {
    common: string;
    official: string;
    nativeName: object;
  };
  population: number;
  region: string;
  subregion: string;
  languages: object;
  borders?: Array<string>;
  currencies: object;
  tld: Array<string>;
  flag: string;
}
