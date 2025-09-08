import rewardsImg from "@/assets/images/clarksrewards.jpg";

export default function RewardsPromo() {
  return (
    <section className="relative w-full bg-transparent">
      {/* top + bottom brand bars */}
      <div className="absolute inset-x-0 top-0 h-2 bg-brand" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-brand" />

      {/* fixed-height white box */}
      <div className="relative z-[1] w-full h-64 bg-surface overflow-hidden">
        <div className="container max-w-screen-2xl h-full flex items-center justify-between px-6 md:px-10 gap-8">
          {/* Phone image */}
          <div className="relative h-full flex-shrink-0">
            <img
              src={rewardsImg}
              alt="Clarks Rewards app preview"
              className="h-[410px] w-auto relative bottom-[-40px]" // hangs below, cropped by h-64 box
            />
          </div>

          {/* Center text */}
          <div className="flex-1 flex flex-col justify-center items-center gap-1 mx-auto text-center md:text-left">
            <p className="font-bold text-black text-2xl md:text-3xl">
              Get 1,500 Points Free
            </p>
            <p className="text-black text-xl md:text-2xl">
              When you join the Clarks Rewards app
            </p>
          </div>

          {/* Button */}
          <a
            href="#get-the-app"
            className="flex-shrink-0 inline-flex items-center justify-center
                      h-14 md:h-16 px-10
                      rounded-[62px] bg-brand
                      text-text-onBrand font-bold
                      text-xl md:text-2xl tracking-[0.33em]
                      whitespace-nowrap hover:opacity-95
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Get the App
          </a>
        </div>
      </div>
    </section>
  );
}
