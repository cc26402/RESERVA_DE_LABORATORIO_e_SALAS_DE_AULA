import { Header } from "../../component/header";

export default function PrivadoLayout
(
    { children }
    : LayoutProps<"/">
) 
{
  return (
    <>
    <Header/>
    { children }
    </>
  );
}