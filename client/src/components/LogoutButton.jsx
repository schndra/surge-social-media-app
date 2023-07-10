const LogoutButton = ({ removeUser }) => {
  return (
    <button
      className="border px-4 mt-4 rounded-md bg-slate-200 hover:bg-slate-400"
      onClick={removeUser}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
