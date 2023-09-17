import customAxios from './customAxios';

type UploadProps = {
  dto: {
    storeName: string;
    mainAddress: string;
    detailAddress: string;
    zipcode: string;
    phoneNumber: string;
    startTime: string;
    endTime: string;
    holiday: string;
    introduce: string;
    userId: string;
  };
  profile: {
    name: string;
    type: string;
    uri: string;
  };
  menus: {
    name: string;
    type: string;
    uri: string;
  };
};

export const uploadStoreInfo = async ({dto, profile, menus}: UploadProps) => {
  const url = '/api/store/register';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }

  //   const body = new FormData();

  //   body.append('dto', JSON.stringify(dto));
  //   body.append('profile', profile);
  //   body.append('menus', menus);

  //   console.log('body in uploadMenu:: ', body);

  const requestData = {
    dto,
    profile,
    menus,
  };

  const {data} = await fetcher.post(url, requestData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};
