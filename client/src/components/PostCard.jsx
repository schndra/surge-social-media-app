import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import moment from "moment";

const PostCard = (props) => {
  const { postImage, postLikes, createdUser, createdAt } = props;
  const timeago = moment(createdAt).fromNow().split(" ").slice(0, 2).join(" ");
  //   console.log(timeago, "hehehe");
  return (
    <div className="w-fixed h-[450px] bg-white mx-auto mb-16 shadow-xl ">
      <div className="h-4/5">
        <img
          src={`${postImage}`}
          alt="sdfsdf"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-1">
          <FaRegHeart />
          {postLikes}
        </div>
        <p>{createdUser.username}</p>
        <p className="text-xs">{timeago}</p>
      </div>
    </div>
  );
};

export default PostCard;
