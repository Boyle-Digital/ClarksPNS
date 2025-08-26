import Container from "@/components/ui/Container";

export default function Footer() {
return (
<footer className="border-t border-neutral-200/70 bg-white py-10 text-sm dark:border-white/10 dark:bg-neutral-950">
<Container className="flex flex-col items-start justify-between gap-6 sm:flex-row">
<div className="flex items-center gap-2">
<div className="h-6 w-6 rounded-md bg-blue-700" aria-hidden />
<span className="font-semibold">Clarks</span>
</div>
<p className="text-neutral-500">© {new Date().getFullYear()} Clarks Pump-N-Shop. All rights reserved.</p>
</Container>
</footer>
);
}