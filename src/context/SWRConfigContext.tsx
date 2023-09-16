import React from 'react';
import {SWRConfig} from 'swr';
import customAxios from '../api/customAxios';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({children}: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          customAxios().then(
            axios => axios && axios.get(url).then(res => res.data),
          ),
      }}>
      {children}
    </SWRConfig>
  );
}
