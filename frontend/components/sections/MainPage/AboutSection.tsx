import Image from "next/image";

const aboutText =
  "ITS Basketball League 2026 (IBL2K26) merupakan kompetisi bola basket antar Himpunan Mahasiswa Departemen (HMD) yang menjadi salah satu agenda olahraga tahunan terbesar di Institut Teknologi Sepuluh Nopember, yang diselenggarakan oleh UKM Basket ITS. IBL2K26 tidak hanya menjadi wadah pengembangan bakat basket, tetapi juga sarana membangun karakter, solidaritas, serta sportivitas dalam persaingan yang kompetitif dan berintegritas.";

export const AboutSection = () => {
  return (
    <section className="w-full overflow-hidden bg-transparent px-2 py-10 md:px-8 md:py-16">
      <div className="relative mx-auto aspect-[1879.8/1084] max-md:aspect-[4/5] w-full max-w-[390px] md:max-w-[1140px]">
        <h2 className="sr-only">Get To Know IBL</h2>
        <div className="absolute left-[5.5%] top-[14%] h-[70%] w-[90%] max-md:left-[0%] max-md:top-[16%] max-md:h-[62%] max-md:w-[100%]">
          <Image
            src="/images/about/about-paper.svg"
            alt=""
            fill
            className="object-fill"
            sizes="(min-width: 768px) 977px, 100vw"
            priority
          />
        </div>
        <div className="absolute left-1/2 top-[4.9%] z-20 w-[45.3%] -translate-x-1/2 max-md:top-[6%] max-md:w-[95%]">
          <Image src="/images/about/polygon_84.svg" alt="" width={164} height={130} className="absolute left-[-16.2%] top-[7.3%] z-30 w-[19.19%]" />
          <Image src="/images/about/polygon_85.svg" alt="" width={128} height={136} className="absolute left-[-6.5%] top-[-23.8%] z-30 w-[15.01%]" />
          <Image
            src="/images/about/get-to-know-ibl-title.svg"
            alt=""
            width={1085}
            height={300}
            className="h-auto w-full relative z-20"
            priority
          />
          <Image src="/images/about/letter_G.png" alt="G" width={46} height={63} className="absolute left-[8.67%] top-[18.83%] z-30 w-[9.18%] h-auto object-contain" />
          <Image src="/images/about/letter_E.png" alt="E" width={37} height={62} className="absolute left-[17.85%] top-[16.05%] z-30 w-[7.38%] h-auto object-contain" />
          <Image src="/images/about/letter_T1.png" alt="T" width={43} height={62} className="absolute left-[25.12%] top-[19.86%] z-30 w-[8.57%] h-auto object-contain" />
          <Image src="/images/about/letter_T2.png" alt="T" width={43} height={63} className="absolute left-[35.21%] top-[20.76%] z-30 w-[8.57%] h-auto object-contain" />
          <Image src="/images/about/letter_O1.png" alt="O" width={49} height={63} className="absolute left-[42.95%] top-[18.71%] z-30 w-[9.78%] h-auto object-contain" />
          <Image src="/images/about/letter_K.png" alt="K" width={56} height={68} className="absolute left-[52.73%] top-[17.94%] z-30 w-[11.07%] h-auto object-contain" />
          <Image src="/images/about/letter_N.png" alt="N" width={47} height={63} className="absolute left-[62.87%] top-[19.69%] z-30 w-[9.37%] h-auto object-contain" />
          <Image src="/images/about/letter_O2.png" alt="O" width={49} height={62} className="absolute left-[71.36%] top-[20.06%] z-30 w-[9.78%] h-auto object-contain" />
          <Image src="/images/about/letter_W.png" alt="W" width={60} height={62} className="absolute left-[79.59%] top-[19.61%] z-30 w-[11.97%] h-auto object-contain" />
          <Image src="/images/about/letter_I.png" alt="I" width={43} height={164} className="absolute left-[32.70%] top-[60.00%] z-30 w-[8.65%] h-auto object-contain" />
          <Image src="/images/about/letter_B.png" alt="B" width={52} height={162} className="absolute left-[43.77%] top-[63.00%] z-30 w-[10.37%] h-auto object-contain" />
          <Image src="/images/about/letter_L.png" alt="L" width={63} height={165} className="absolute left-[54.93%] top-[60.00%] z-30 w-[12.56%] h-auto object-contain" />
        </div>
        <Image
          src="/images/about/about-hoop.svg"
          alt=""
          width={147}
          height={234}
          className="absolute left-[75.8%] top-[9.4%] z-10 w-[7.63%] max-md:left-[80.5%] max-md:top-[13%] max-md:w-[12%]"
        />
        <Image
          src="/images/about/about-red-left.svg"
          alt=""
          width={99}
          height={160}
          className="absolute left-[69.5%] top-[13.8%] z-20 w-[5.44%] max-md:left-[75%] max-md:top-[13%] max-md:w-[8%]"
        />
        <Image
          src="/images/about/about-red-right.svg"
          alt=""
          width={87}
          height={82}
          className="absolute left-[72.5%] top-[17.9%] z-20 w-[4.77%] max-md:left-[79%] max-md:top-[17%] max-md:w-[7%]"
        />
        <Image
          src="/images/about/about-basket.svg"
          alt=""
          width={195}
          height={298}
          className="absolute left-[7%] top-[57%] z-20 w-[13.5%] max-md:left-[2%] max-md:top-[66%] max-md:w-[22%]"
        />
        <Image
          src="/images/about/about-shoes.svg"
          alt=""
          width={312}
          height={245}
          className="absolute left-[69.5%] top-[61%] z-20 w-[17%] max-md:left-[54%] max-md:top-[69%] max-md:w-[24%]"
        />
        <Image
          src="/images/about/about-shoes.svg"
          alt=""
          width={312}
          height={245}
          className="absolute left-[80.5%] top-[58%] z-20 w-[17%] max-md:left-[72%] max-md:top-[66%] max-md:w-[24%]"
        />
        <p className="absolute left-[21.8%] top-[31.5%] w-[58%] text-justify font-[var(--font-drowner)] text-[clamp(0.36rem,1.8vw,0.7rem)] font-bold leading-[1.38] text-[#070503]/80 md:text-[clamp(0.95rem,1.75vw,1.28rem)] max-md:left-[50.8%] max-md:top-[40%] max-md:w-[76%] max-md:-translate-x-1/2 max-md:text-[clamp(0.58rem,3.1vw,0.9rem)]">
          {aboutText}
        </p>
      </div>
    </section>
  );
};
