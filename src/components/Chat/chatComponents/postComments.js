import { List } from 'antd';
import VirtualList from 'rc-virtual-list';
import PostComment from './comment';

export default function PostComments({ messages }) {
  return (
    <div>
      <List itemLayout="vertical">
        <VirtualList
          data={messages}
          height="40vh"
          style={{ padding: '5%' }}
        >
          {
             (item) => (
               <PostComment content={item.content} username={item.username} />
             )
             }
        </VirtualList>
      </List>
    </div>
  );
}
