import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";


export default function HeroBillboard() {
return (
<section className="relative isolate">
{/* Background image with dark overlay */}
<div className="absolute inset-0 -z-10">
<img
src="/clarkshero.png"
alt="Clarks forecourt canopy"
className="h-full w-full object-cover"
/>
<div className="absolute inset-0 bg-neutral-900/40" />
</div>


<Container>
<div className="grid min-h-[60vh] grid-cols-1 items-center gap-8 py-14 sm:py-20 lg:min-h-[70vh]">
<div className="max-w-2xl text-white">
<h1 className="text-5xl font-extrabold leading-[0.95] sm:text-6xl md:text-7xl">
<span className="block">Refresh.</span>
<span className="block">Refuel.</span>
<span className="block">Return.</span>
</h1>


{/* Accent rule */}
<div className="mt-6 h-1 w-20 bg-white/90" />


<p className="mt-4 max-w-prose text-base/relaxed text-white/90">
Your Trusted Shop for Fuel, Food, and Friendly Faces
</p>


<div className="mt-8">
<Button rounded="pill" className="tracking-[0.2em]">
Join Rewards
</Button>
</div>
</div>
</div>
</Container>
</section>
);
}