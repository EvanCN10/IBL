import Image from "next/image";

export const ThemeSection = () => {
  return (
    <section className="w-full overflow-hidden bg-transparent px-2 py-8 md:px-8 md:py-12">
      <div className="relative mx-auto mb-2 aspect-[1041/514] w-[64%] max-w-[250px] md:mb-[-2%] md:max-w-[520px]">
        <h2 className="sr-only">Theme IBL</h2>
        <Image
          src="/images/theme/theme-ibl-2052-762.svg"
          alt="Theme IBL"
          fill
          priority
          className="object-contain"
          sizes="(min-width: 768px) 520px, 64vw"
        />
      </div>
      <div className="relative mx-auto aspect-[1341/822] w-full max-w-[390px] md:max-w-[1080px]">
        <Image
          src="/images/theme/theme-detail-2052-854.svg"
          alt="Theme IBL: Fastbreak, Fastbreak Collector, Collector"
          fill
          priority
          className="object-contain"
          sizes="(min-width: 768px) 1080px, 100vw"
        />
      </div>
    </section>
  );
};
