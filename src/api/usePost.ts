import customAxios from './customAxios';

type UploadProps = {
  commonDto: {
    userId: string;
    menuName: string;
    originalPrice: string;
    discountedPrice: string;
    isBargainning: string;
    type: string;
    endTime: string;
  };
  bargainDto: {
    limitTime: string;
    minPrice: string;
  };
  file: {
    name: string;
    type: string;
    uri: string;
  };
};

export const uploadMenu = async ({
  commonDto,
  bargainDto,
  file,
}: UploadProps) => {
  const url = '/api/menu/register';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }

  const body = new FormData();

  for (const [key, value] of Object.entries(commonDto)) {
    body.append(key, value);
  }

  if (commonDto.isBargainning === 'T') {
    body.append('limitTime', bargainDto.limitTime);
    body.append('minPrice', bargainDto.minPrice);
  }

  body.append('menuImages[0]', file);

  console.log('body in uploadMenu:: ', body);

  const {data} = await fetcher.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
