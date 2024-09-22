import Image from "next/image"

export function Location({map_image, location_highlights}) {
    return(<>
    
    <section className="bg-foreground py-48 font-roboto sm:py-12 sm:pb-0">
        <div className="container flex items-center gap-9 sm:flex-col-reverse sm:flex-wrap sm:gap-4">
          <div className="w-3/4 sm:w-full">
            <Image
              src={
                process.env.NEXT_PUBLIC_API_URL + "/assets/" + map_image
              }
              alt="project1"
              width={1200}
              height={800}
              className="h-fit w-full"
            />
          </div>
          <div className="w-1/4 sm:w-full sm:px-16">
            <div>
              <h4 className="mb-8 text-4xl font-semibold text-background sm:text-2xl sm:font-medium">
                Location <br />
                <span className="font-saol italic text-primary">Highlight</span>
              </h4>
              {location_highlights.map((location, index) => (
                <div key={index} className="mb-6">
                  <h4 className="flex items-center gap-2 border-b-2 border-primary pb-1 text-2xl capitalize text-background sm:text-xl sm:font-normal">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/assets/" +
                        location.icon
                      }
                      width={24}
                      height={24}
                      className="filter-primary h-6 w-6"
                    />
                    {location.label}
                  </h4>
                  <ul className="ml-6 list-image-[url(/images/list_style.png)] sm:text-sm">
                    {location.highlights.map((item, index) => (
                      <li key={index} className="text-base text-background">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    
    </>)
}