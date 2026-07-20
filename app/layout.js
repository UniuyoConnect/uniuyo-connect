export const metadata = {
  title: "Uniuyo Connect - Real Students Only",
  description: "The campus network for University of Uyo - 13 faculties, marketplace, verified real photos only",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Inter', sans-serif", background: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
