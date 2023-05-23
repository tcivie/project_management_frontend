// OGCard.js
import React, { useState, useEffect } from 'react';
import {
  Card, Skeleton, Image,
} from 'antd';
import { fetchOpenGraphData } from '../utils/fetchWikiData'; // import our fetch function

export default function OGCard({ wikiId }) {
  const [ogData, setOgData] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  useEffect(() => {
    setContentLoading(true);
    if (!wikiId) {
      return;
    }
    fetchOpenGraphData(wikiId).then((data) => {
      setOgData(data.result);
      setContentLoading(false);
    });
  }, [wikiId]);

  return (
    <Card
      bodyStyle={{
        padding: '5px',
        position: 'absolute',
        top: '-1px',
        width: '100%',
        display: 'float',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '5px 5px 0px 0px',
        border: '1px solid white',
      }}
      cover={(
          // eslint-disable-next-line no-nested-ternary
          wikiId ? ((contentLoading) ? (
            <Skeleton.Image
              active
              className="og-image-topBar"
            />
          ) : (
            <Image
              src={ogData?.ogImage ? ogData.ogImage[0].url : 'error'}
              style={{
                objectFit: 'cover',
                height: '250px',
                width: '100%',
              }}
              fallback="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
            />
          )
          ) : (
            <Skeleton.Image
              className="og-image-topBar"
            />
          )
        )}
    >

      <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
      }}
      >
        <div style={{ fontWeight: 'bold', marginRight: '10px' }}>{wikiId && ogData?.ogTitle ? ogData.ogTitle : 'Multiple Cities Selected'} -</div>
        <div style={{ flexShrink: 1, textOverflow: 'ellipsis', overflow: 'hidden' }}>{wikiId && ogData?.ogDescription ? ogData.ogDescription : 'You have selected a cities cluster.'}</div>
      </div>

    </Card>
  );
}
