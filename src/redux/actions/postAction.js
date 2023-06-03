export function userJoined(user) {
  return { type: 'USER_JOINED', payload: user };
}

export function userLeft(user) {
  return { type: 'USER_LEFT', payload: user };
}

export function postCreated(post) {
  console.log('postCreated action', post);
  return { type: 'POST_CREATED', payload: post };
}

export function postsFetched(posts) {
  console.log('postsFetched action', posts);
  return { type: 'POSTS_FETCHED', payload: posts };
}
