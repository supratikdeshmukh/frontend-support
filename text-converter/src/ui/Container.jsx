export default function Container({ children }) {
  return (
    <main className="container main-content" role="main">
      {children}
    </main>
  );
}
