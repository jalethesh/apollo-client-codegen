import { useState } from 'react';
import axios from 'axios';

import client from '../../graphql';

import { GET_REAL_ITEM_MEDIAS } from '../../graphql/queries';

interface MediaUploadProps {
  real_item_id: string;
  mediaOrder: number | undefined;
}

const labels = ['FRONT', 'BACK'];

export default function MediaUpload(props: MediaUploadProps) {
  const { real_item_id, mediaOrder } = props;

  let label = '';

  if (mediaOrder && mediaOrder > 1) {
    label = String(mediaOrder + 1);
  } else {
    label = labels[mediaOrder as number];
  }

  const upload_endpoint =
    process.env.REACT_APP_JUZAM2_URI +
    `/upload?real_item_id=${real_item_id}&labels=${label}`;
  const [file, updateFile] = useState(null);

  const onChangeHandler = (event: any) => {
    updateFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    // @ts-ignore
    data.append('file', file);
    axios
      .post(upload_endpoint, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (res: any) => {
        if (res.data.url) {
          await client.refetchQueries({
            include: [GET_REAL_ITEM_MEDIAS],
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={onChangeHandler} />
      <button
        type="button"
        className="btn btn-success btn-block"
        onClick={onClickHandler}
      >
        Upload
      </button>
    </div>
  );
}
