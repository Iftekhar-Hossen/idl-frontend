import Image from "next/image";
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious  } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export function ApartmentFeatures({apartment_features, name}) {
    return (<>
          <section className="bg-primary-300 py-14">
        <div className="container m-auto grid grid-cols-12 pb-14 sm:pb-14 sm:pt-10">
          <div className="col-span-6 sm:col-span-12">
            <h5 className="font-roboto text-neutral-200 sm:text-center sm:text-base">
              Features
            </h5>
            <h3 className="font-roboto text-6xl text-white sm:text-center sm:text-2xl sm:font-normal">
              Apartment <br />
              <span className="font-saol italic text-neutral-300">
                Features
              </span>
            </h3>
          </div>
          <div className="col-span-6 sm:col-span-12">
            <p className="pt-8 font-roboto text-2xl text-white sm:pt-4 sm:text-center sm:text-sm">
              {name} is a luxury apartment complex that offers residents
              a comfortable and convenient lifestyle. With its wide range of
              features and amenities, {name} is the perfect place to
              call home.
            </p>
          </div>
        </div>
        <div className="container">
          <Carousel className="w-full">
            <CarouselContent>
              {apartment_features.map((data, index) => (
                <CarouselItem className="group relative basis-1/3 overflow-hidden duration-300 ease-in-out md:basis-1/3 sm:basis-1/2">
                  <AspectRatio ratio={3 / 3}>
                    <div className="relative flex h-full w-full items-end overflow-hidden rounded-lg bg-[#262626] bg-[url(/images/mask_bg.png)] bg-cover bg-fixed shadow-lg duration-300 ease-in-out group-hover:bg-secondary-300">
                      <div className="absolute inset-0 z-10" />
                      <div className="">
                        <div className="absolute left-0 top-2/4 h-full w-full p-14 pt-5 duration-300 ease-in-out group-hover:top-5">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              "/assets/" +
                              data.icon
                            }
                            alt="feature1"
                            width={56}
                            height={56}
                            className="filter-primary h-14 w-14 duration-300 ease-in-out group-hover:h-7 group-hover:w-7 sm:h-10 sm:w-10"
                          />
                          <h3 className="mt-4 text-3xl font-normal text-white duration-300 ease-in-out group-hover:text-2xl group-hover:text-neutral-300 sm:mt-2 sm:text-xl">
                            {data.name}
                          </h3>
                        </div>
                        <p className="absolute -bottom-full left-0 w-full p-14 pb-0 text-sm duration-300 ease-in-out group-hover:bottom-7">
                          {data.details}
                        </p>
                      </div>
                    </div>
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute -top-6 right-0 fill-neutral-300 text-neutral-300 opacity-100 sm:hidden" />
            <CarouselPrevious className="absolute -top-6 left-[calc(100%-80px)] sm:hidden" />
          </Carousel>
        </div>
      </section>
    
    
    </>)
}