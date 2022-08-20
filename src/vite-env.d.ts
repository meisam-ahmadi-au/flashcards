/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GKEY: string;
  readonly VITE_APP_AUTHDOMAIN: string;
  readonly VITE_APP_DATABASEURL: string;
  readonly VITE_APP_PROJECTID: string;
  readonly VITE_APP_STORAGEBUCKET: string;
  readonly VITE_APP_MESSAGINGSENDERID: string;
  readonly VITE_APP_APPID: string;
  readonly VITE_APP_MEASUREMENTID: string;
  readonly VITE_APP_MERRIAM_WEBSTER: string;
  readonly VITE_APP_BFF_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
