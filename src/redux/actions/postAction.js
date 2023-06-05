export function userJoined(user) {
  return { type: 'USER_JOINED', payload: user };
}

export function userLeft(user) {
  return { type: 'USER_LEFT', payload: user };
}

export function userSaved(user) {
  return { type: 'USER_SAVED', payload: user };
}

export function userUnSaved(user) {
  return { type: 'USER_UNSAVED', payload: user };
}

export function userLiked(user) {
  return { type: 'USER_LIKED', payload: user };
}

export function userUnLiked(user) {
  return { type: 'USER_UNLIKED', payload: user };
}

export function postCreated(post) {
  return { type: 'POST_CREATED', payload: post };
}

export function postsFetched(posts) {
  console.log('postsFetched', posts);
  return { type: 'POSTS_FETCHED', payload: posts };
}
