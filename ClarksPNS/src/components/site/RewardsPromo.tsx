import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";


export default function RewardsPromo() {
return (
<div className="relative">
{/* White band with content */}
<Section padded={false} className="bg-white py-12 sm:py-16">
<div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
{/* Phone image, visually overlaps bottom band */}
<div className="relative order-2 sm:order-1">
<div className="relative mx-auto h-[360px] w-[200px] sm:h-[420px] sm:w-[240px]">
<img
src="/clarksrewards.jpg"
alt="Clarks Rewards app on phone"
className="absolute inset-0 h-full w-full object-contain"
/>
</div>
</div>


{/* Copy + CTA */}
<div className="order-1 sm:order-2">
<p className="text-center text-lg font-extrabold sm:text-left">Get 1,500 Points Free</p>
<p className="mt-2 text-center text-sm text-neutral-700 sm:text-left">
When you join the Clarks Rewards app
</p>
<div className="mt-6 flex justify-center sm:justify-start">
<Button variant="primary" rounded="pill" className="tracking-[0.2em]">
Get the App
</Button>
</div>
</div>
</div>
</Section>


{/* Blue band below that clips the phone (visual cue from screenshot) */}
<Section padded={false} bg="brand" className="h-16 sm:h-20" />
</div>
);
}