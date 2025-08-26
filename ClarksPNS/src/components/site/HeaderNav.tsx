import Container from "@/components/ui/Container";


const links = [
{ href: "#rewards", label: "Clarks Rewards" },
{ href: "#locations", label: "Locations" },
{ href: "#food", label: "Food" },
{ href: "#carwash", label: "Car Wash" },
{ href: "#about", label: "About Us" },
];


export default function HeaderNav() {
return (
<header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-neutral-950">
<Container className="flex h-16 items-center justify-between gap-6">
{/* Logo */}
<a href="/" className="flex items-center gap-3">
<img src="/clarks-logo.png" alt="Clark's Pump-N-Shop" className="h-8 w-auto" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
<span className="text-sm font-bold tracking-wide">Clark's Pump-N-Shop</span>
</a>


{/* Desktop nav */}
<nav className="hidden items-center gap-6 md:flex">
{links.map((l) => (
<a
key={l.href}
href={l.href}
className="text-sm font-medium text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
>
{l.label}
</a>
))}
</nav>


{/* Mobile trigger placeholder */}
<button className="md:hidden" aria-label="Open menu">
<div className="i-lucide-menu h-6 w-6" />
</button>
</Container>
</header>
);
}