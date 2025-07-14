function Home() {
  return (
    <div className="p-6">
      <h2 className="text-xl">Welcome, </h2>
      <p>Email:</p>
      <a
        href="http://localhost:4300/api/auth/logout"
        className="text-red-500 mt-4 block"
      >
        Logout
      </a>
    </div>
  );
}

export default Home;
