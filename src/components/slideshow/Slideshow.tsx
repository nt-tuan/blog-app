import React, { useState, useEffect } from "react";
import { PostProps } from "resources/models/post";
import { PostMeta } from "components/post/PostDetail";
import { generateIDParamPath } from "constants/routes";
import { Link } from "react-router-dom";
import { getPosts } from "resources/api/post";
import { postRoutes } from "constants/postRoutes";

const LoadingSlideshowItem = () => {
  return (
    <div className={`slide-item`}>
      <div>
        <div></div>
      </div>
    </div>
  );
};

const SlideshowItem = (props: PostProps) => {
  const background = `url(https://domesco.com/pictures/catalog/banner/baner-2020/Banner-HCV-Final.jpg) center center / cover no-repeat rgb(255, 255, 255)`;
  return (
    <div className="slide-item">
      <div>
        <div className="slide-item-image" style={{ background }}></div>
        <Link to={generateIDParamPath(postRoutes.postDetail, props.id)}>
          <div className="header">
            {props.title}
            <PostMeta size="sm" post={{ ...props, tags: [] }} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export const Slideshow = () => {
  const [items, setItems] = useState<PostProps[]>();
  const [err, setErr] = useState<string>();
  useEffect(() => {
    getPosts(0, 4, ["slideshow"])
      .then((posts) => setItems(posts))
      .catch((err) => setErr(err));
  }, []);
  if (items == null && err == null)
    return (
      <div className={`slide-container`}>
        <LoadingSlideshowItem />
        <LoadingSlideshowItem />
        <LoadingSlideshowItem />
        <LoadingSlideshowItem />
      </div>
    );

  return (
    <div className="slide-container">
      {items?.map((u) => (
        <SlideshowItem key={u.id} {...u} />
      ))}
    </div>
  );
};
