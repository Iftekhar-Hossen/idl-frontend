import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
export function MostFeatures({ features }) {
  return (
    <>
      <section className="bg-[#F6F3EC] pb-20 pt-40  font-roboto md:pt-16 sm:bg-background sm:pt-20">
        <div className="container">
          <div className="text-center">
            <h5 className="text-base md:text-xs sm:text-xs sm:font-medium">
              See the most <br className="hidden sm:block" /> important features
            </h5>
            <h4 className="font-roboto text-4xl font-semibold text-neutral-300 md:text-3xl sm:text-3xl sm:font-bold">
              At A{" "}
              <span className="font-saol italic text-primary-300">Glance</span>
            </h4>
          </div>

          <div className="mt-24 content-center md:mt-8 sm:mt-4">
            <div className="grid grid-cols-10 sm:flex sm:flex-nowrap sm:overflow-y-scroll snap-mandatory snap-x gap-y-10">
              {features.map((feature, i) => (
                <div key={i} className="col-span-2 sm:snap-center text-center">
                  <div className="justify-centerar m-auto flex h-24 w-24 items-center border border-primary md:h-16 md:w-16">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/assets/" +
                        feature.icon
                      }
                      alt="feature1"
                      width={48}
                      height={48}
                      className="filter-primary m-auto h-10 w-10"
                    />
                  </div>
                  <h5 className="m-auto mt-3 w-24 text-base font-normal md:mt-2 md:text-base sm:text-sm">
                    {feature.name}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
