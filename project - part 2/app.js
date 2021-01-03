const posts = [{ title: "post1" }, { title: "post2" }];

const createPost = (post) => {
  return new Promise((resolve, reject) => {
    const time = [1000, 3000, 5000];
    const random = Math.floor(Math.random() * time.length);
    setTimeout(() => {
      let error = false;
      if (!error) {
        posts.push(post);
        resolve(posts);
      } else {
        reject(error);
      }
    }, time[random]);
  });
};

createPost({ title: "post3" })
  .then((data) => {
    console.log("posts", data);
    return createPost({ title: "post4" });
  })
  .then((data) => {
    console.log("posts", data);
    return createPost({ title: "post5" });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("settled");
  });

const createPostsAsyncAwait = async () => {
  try {
    await createPost({ title: "post 6" });
    await createPost({ title: "post 7" });
    await createPost({ title: "post 8" });
    console.log("finished", posts);
  } catch (error) {
    console.log("error:", error);
  }
};
createPostsAsyncAwait();
