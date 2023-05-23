// OGCard.js
import React, { useState, useEffect } from 'react';
import {
  Card, Skeleton, Spin, Image,
} from 'antd';
import { fetchOpenGraphData } from '../utils/fetchWikiData'; // import our fetch function

export default function OGCard({ wikiId }) {
  const [ogData, setOgData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!wikiId) {
      return;
    }
    fetchOpenGraphData(wikiId).then((data) => {
      setOgData(data.result);
      setLoading(false);
    });
  }, [wikiId]);
  return (
    <Card
      bodyStyle={{ padding: '10px' }}
      cover={
               wikiId && ((loading)
                 ? (
                   <Spin style={{ paddingTop: '65px' }} tip="Loading" size="large">
                     <div className="content" />
                   </Spin>
                 )
                 : (
                   <Image
                     src={ogData.ogImage ? ogData.ogImage[0].url : 'error'}
                     style={{
                       objectFit: 'fill',
                       height: '160px',
                       width: '100%',
                     }}
                     fallback="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                   />
                 ))
            }
    >

      {loading && wikiId ? (
        <Skeleton active />
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'nowrap',
        }}
        >
          <div style={{ fontWeight: 'bold', marginRight: '10px' }}>{wikiId ? ogData.ogTitle : 'Multiple Cities Selected'} -</div>
          <div style={{ flexShrink: 1, textOverflow: 'ellipsis', overflow: 'hidden' }}>{wikiId ? ogData.ogDescription : 'You have selected a cities cluster.'}</div>
        </div>
      )}
    </Card>
  );
}
