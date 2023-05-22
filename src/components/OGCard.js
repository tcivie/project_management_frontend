// OGCard.js
import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from 'antd';
import { fetchOpenGraphData } from '../utils/fetchWikiData'; // import our fetch function

export default function OGCard({ wikiId }) {
  const [ogData, setOgData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wikiId) {
      return;
    }
    fetchOpenGraphData(wikiId).then((data) => {
      setOgData(data.result);
      setLoading(false);
    });
  }, [wikiId]);

  console.log('ogImage', ogData);
  return (
    <Card
      style={{ width: '100%' }}
      cover={
                (loading || !ogData.ogImage)
                  ? <Skeleton.Image />
                  : (
                    <img
                      alt="example"
                      src={ogData.ogImage ? ogData.ogImage[0].url : ''}
                      style={{
                        objectFit: 'cover',
                        height: '150px',
                        width: '100%',
                      }}
                    />
                  )
            }
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <div style={{
          display: 'flex', flexWrap: 'nowrap',
        }}
        >
          <div style={{ fontWeight: 'bold', marginRight: '10px' }}>{ogData.ogTitle} - </div>
          <div style={{ flexShrink: 1, textOverflow: 'ellipsis', overflow: 'hidden' }}>{ogData.ogDescription}</div>
        </div>
      )}
    </Card>
  );
}
