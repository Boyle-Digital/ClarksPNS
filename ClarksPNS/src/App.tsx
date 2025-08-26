import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@/components/site/HeaderNav";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";


export default function App() {
return (
<BrowserRouter>
<div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
<Header />
<Routes>
<Route path="/" element={<Home />} />
</Routes>
<Footer />
</div>
</BrowserRouter>
);
}