const getAllPost = async (req, res) => {
  // console.log(req.user);
  res.send(req.user);
};

export { getAllPost };
