// RewardsPromo.tsx
export default function RewardsPromo() {
    return (
        <section className="relative w-full bg-transparent">
            {/* top + bottom blue bars */}
            <div className="absolute inset-x-0 top-0 h-2 bg-[#263B95]" />
            <div className="absolute inset-x-0 bottom-0 h-2 bg-[#263B95]" />

            {/* White background full width */}
            <div className="relative z-[1] w-full h-64 bg-white overflow-hidden flex items-center justify-center px-6 md:px-10">
                

                {/* Text + button on right */}
                <div className="relative z-[1] w-full h-64 bg-white overflow-hidden flex items-center px-6 md:px-10">
                    {/* Phone */}
                    <div className="relative h-full flex-shrink-0">
                        <img
                            src="/clarksrewards.jpg"
                            alt="Clarks Rewards app preview"
                            className="h-[410px] w-auto relative bottom-[-40px]"
                        />
                    </div>

                    {/* Text (centered between phone + button) */}
                    <div className="flex-1 flex flex-col justify-center items-center gap-1 mx-auto">
                        <p className="font-['Oswald'] font-bold text-black text-2xl md:text-3xl text-center">
                            Get 1,500 Points Free
                        </p>
                        <p className="font-['Oswald'] text-black text-xl md:text-2xl text-center">
                            When you join the Clarks Rewards app
                        </p>
                    </div>

                    {/* Button (right) */}
                    <a
                        href="#get-the-app"
                        className="flex-shrink-0 inline-flex items-center justify-center
               h-14 md:h-16 px-10
               rounded-[62px] bg-[#263B95]
               text-white font-['Oswald'] font-bold
               text-xl md:text-2xl tracking-[0.33em]
               whitespace-nowrap hover:opacity-95
               focus:outline-none focus:ring-4 focus:ring-[#263B95]/30"
                    >
                        Get the App
                    </a>
                </div>

            </div>
        </section>
    );
}
