import React, { useEffect } from "react";
import { Sidebar, PostCard } from "../components";
import { useGlobalContext } from "../context/context";
import { RxHamburgerMenu } from "react-icons/rx";
import surgeLogo from "../assets/surgeLogo 1.png";
import UserSVG from "../assets/user.svg";

//for testing purposes
// import dummyData from "../dummData";

const Posts = () => {
  const { isPostSidebar, togglePostSidebar, user, getAllPosts, posts } =
    useGlobalContext();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {isPostSidebar && <Sidebar posts={true} />}
      <main className="lg:max-w-[1440px] lg:relative">
        <section>
          <nav className="flex items-center justify-between p-4 lg:hidden shadow-md">
            <div className="w-32 ">
              <img
                src={surgeLogo}
                alt="surgeLogo"
                className="w-full h-full rounded-full"
              />
            </div>
            <button className="lg:hidden " onClick={togglePostSidebar}>
              <RxHamburgerMenu className="text-black" size={30} />
            </button>
          </nav>
        </section>

        <section>
          {posts.map((item) => {
            return <PostCard key={item._id} {...item} />;
          })}
        </section>

        {/* lg sidebar */}
        <aside className="bg-white  h-screen p-4 hidden  lg:flex items-start justify-center z-50 lg:fixed w-[375px] right-0 shadow-2xl top-0">
          <div>
            <div className="rounded-full bg-slate-300 w-24 mx-auto mb-4 p-2">
              <img
                src={
                  user.profileImage && user.profileImage !== null
                    ? user.profileImage
                    : UserSVG
                }
                alt="profile image"
                className="w-full "
              />
            </div>
            <h4 className="capitalize">{user.name}</h4>
            <p className="text-center text-gray-500">{user.username}</p>
          </div>
        </aside>
        {/* lg logo */}
        <div className="hidden lg:block w-32 lg:fixed left-8 top-8">
          <img
            src={surgeLogo}
            alt="surgeLogo"
            className="w-full h-full rounded-full"
          />
        </div>
      </main>
    </>
  );
};

export default Posts;
