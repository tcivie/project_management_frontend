import {
  Empty, Layout, List,
} from 'antd';
import React, { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Post from '../components/Chat/Post';
import Poster from '../components/Chat/Poster';
import { postsFetched } from '../redux/actions/postAction';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityId = searchParams.get('cid');
  const lang = searchParams.get('lang');
  const postState = useSelector((state) => state.post);
  const [processedPosts, setProcessedPosts] = useState([]);

  useEffect(() => {
    if (!processedPosts || postState.posts?.length !== processedPosts?.length) {
      if (postState.posts.length > 0) {
        const processed = postState.posts.map((post) => <Post data={post} />);
        setProcessedPosts(processed);
      } else setProcessedPosts([]);
    }
  }, [postState]);

  useEffect(() => {
    // Send request to server to fetch posts
    try {
      fetch(
        `${process.env.REACT_APP_API_SERVER}/api/chat/posts/city/${cityId}/${lang}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': lang,
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          credentials: 'include',
        },
      )
        .then((res) => (res.json()))
        .then((data) => dispatch(postsFetched(data)));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [lang, cityId]);
  return (
    <Layout style={{
      backgroundColor: 'lightgreen',
      height: '100vh',
      overflowY: 'hidden',
      width: '-webkit-fill-available',
    }}
    >
      {/* eslint-disable-next-line array-callback-return */}
      {!postState?.posts || postState?.posts.length === 0
        ? <Empty style={{ position: 'relative', top: '50vh' }} />
        : (
          <List
            itemLayout="vertical"
          >
            <VirtualList
              height={window.innerHeight}
              data={processedPosts}
              style={{ marginTop: '50px' }}
            >
              { (item) => (
                <div style={{ padding: '10px 250px 10px 250px' }}>
                  {item}
                </div>
              )}
            </VirtualList>
          </List>
        )}
      <Poster cityId={cityId} lang={lang} />
    </Layout>
  );
}
export default App;
