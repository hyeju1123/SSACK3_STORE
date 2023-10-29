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
  profileImages: {
    name: string;
    type: string;
    uri: string;
  };
  menuImages: {
    name: string;
    type: string;
    uri: string;
  };
};

export const uploadStoreInfo = async ({
  dto,
  profileImages,
  menuImages,
}: UploadProps) => {
  const url = '/api/store/register';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }

  const body = new FormData();

  for (const [key, value] of Object.entries(dto)) {
    body.append(key, value);
  }

  body.append('profileImages', profileImages);
  body.append('menuImages', menuImages);

  console.log('body in uploadMenu:: ', body);

  const {data} = await fetcher.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
