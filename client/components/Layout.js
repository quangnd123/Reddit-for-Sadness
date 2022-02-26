import { MenuBar } from "./MenuBar.js";
export default function Layout({ children }) {
  return (
    <>
      <MenuBar />
      <main>{children}</main>
    </>
  );
}
