import Header from "./components/Header";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Daily Diet</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
