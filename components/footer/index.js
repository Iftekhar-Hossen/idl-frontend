import Link from "next/link";
import { Icons } from "../icon";
export function Footer() {
  const links = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About Us",
      url: "/about",
    },
    {
      label: "Our Projects",
      url: "/projects",
    },
    {
      label: "Press & Media",
      url: "/press-media",
    },

    {
      label: "Contact",
      url: "/contact",
    },
  ];

  const contactInfo = [
    {
      icon: (
        <svg
          width={"100%"}
          height={"100%"}
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 9.34619C15 10.7269 13.8807 11.8462 12.5 11.8462C11.1193 11.8462 10 10.7269 10 9.34619C10 7.96548 11.1193 6.84619 12.5 6.84619C13.8807 6.84619 15 7.96548 15 9.34619Z"
            stroke="#A07758"
            stroke-width="1.5"
          />
          <path
            d="M18.7222 17.3462C20.1167 19.3347 20.7838 20.3937 20.3865 21.2461C20.3466 21.3316 20.2999 21.4141 20.2469 21.4929C19.6724 22.3462 18.1875 22.3462 15.2178 22.3462H9.78223C6.81251 22.3462 5.32765 22.3462 4.75311 21.4929C4.70005 21.4141 4.65339 21.3316 4.61355 21.2461C4.21619 20.3937 4.88326 19.3347 6.27778 17.3462"
            stroke="#A07758"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.7574 17.8398C13.4201 18.1646 12.9693 18.3462 12.5002 18.3462C12.031 18.3462 11.5802 18.1646 11.2429 17.8398C8.1543 14.847 4.01519 11.5037 6.03371 6.64992C7.1251 4.02552 9.74494 2.34619 12.5002 2.34619C15.2554 2.34619 17.8752 4.02552 18.9666 6.64992C20.9826 11.4976 16.8536 14.8573 13.7574 17.8398Z"
            stroke="#A07758"
            stroke-width="1.5"
          />
        </svg>
      ),
      text: "Plot:31, Road:09, Block: H, sector -17, Uttara, Dhaka 1230",
    },

    {
      icon: (
        <svg
          width={"100%"}
          height={"100%"}
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 4.34619H20.5C21.6 4.34619 22.5 5.24619 22.5 6.34619V18.3462C22.5 19.4462 21.6 20.3462 20.5 20.3462H4.5C3.4 20.3462 2.5 19.4462 2.5 18.3462V6.34619C2.5 5.24619 3.4 4.34619 4.5 4.34619Z"
            stroke="#A07758"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.5 6.34619L12.5 13.3462L2.5 6.34619"
            stroke="#A07758"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      text: "inheritance.ltd@gmail.com",
    },
    {
      icon: (
        <svg
          width={"100%"}
          height={"100%"}
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5004 17.2662V20.2662C22.5016 20.5447 22.4445 20.8203 22.3329 21.0755C22.2214 21.3307 22.0577 21.5598 21.8525 21.748C21.6473 21.9363 21.405 22.0796 21.1412 22.1689C20.8773 22.2581 20.5978 22.2912 20.3204 22.2662C17.2433 21.9318 14.2874 20.8803 11.6904 19.1962C9.27425 17.6608 7.22576 15.6123 5.69042 13.1962C4.0004 10.5874 2.94866 7.61716 2.62042 4.52617C2.59543 4.24963 2.6283 3.97093 2.71692 3.70779C2.80555 3.44465 2.94799 3.20286 3.13519 2.99779C3.32238 2.79272 3.55023 2.62888 3.80421 2.51669C4.0582 2.4045 4.33276 2.34643 4.61042 2.34617H7.61042C8.09573 2.34139 8.56621 2.51324 8.93418 2.8297C9.30215 3.14615 9.5425 3.58561 9.61042 4.06617C9.73704 5.02623 9.97187 5.96889 10.3104 6.87617C10.445 7.23409 10.4741 7.62308 10.3943 7.99705C10.3146 8.37101 10.1293 8.71428 9.86042 8.98617L8.59042 10.2562C10.014 12.7597 12.0869 14.8326 14.5904 16.2562L15.8604 14.9862C16.1323 14.7173 16.4756 14.532 16.8495 14.4523C17.2235 14.3725 17.6125 14.4016 17.9704 14.5362C18.8777 14.8747 19.8204 15.1095 20.7804 15.2362C21.2662 15.3047 21.7098 15.5494 22.027 15.9237C22.3441 16.298 22.5126 16.7757 22.5004 17.2662Z"
            stroke="#A07758"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      text: "+880 1740062270",
    },
  ];

  const projects = [
    {
      label: "Ongoing Projects",
      url: "/projects?status=ongoing",
    },
    {
      label: "Upcoming Projects",
      url: "/projects?status=upcoming",
    },
    {
      label: "Complete Projects",
      url: "/projects?status=completed",
    },
  ];

  const socialLinks = [
    {
      icon: (props) => (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 32 33"
          width="1em"
          height="1em"
        >
          <g clipPath="url(#a)">
            <path d="M32 16.445c0-8.836-7.164-16-16-16s-16 7.164-16 16c0 7.987 5.85 14.605 13.5 15.806V21.07H9.437v-4.627H13.5V12.92c0-4.01 2.39-6.225 6.044-6.225 1.75 0 3.581.313 3.581.313v3.938h-2.018c-1.988 0-2.608 1.233-2.608 2.498v3h4.437l-.71 4.627H18.5v11.18C26.149 31.05 32 24.43 32 16.445Z" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 .346h32v32H0z" />
            </clipPath>
          </defs>
        </svg>
      ),
      url: "https://www.facebook.com/inheritancebd?mibextid=ZbWKwL",
    },
    {
      icon: (props) => (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 32 33"
          width="1em"
          height="1em"
        >
          <path d="M27.263 27.616h-4.739V20.19c0-1.77-.036-4.05-2.47-4.05-2.47 0-2.847 1.927-2.847 3.92v7.556h-4.739v-15.27h4.552v2.082h.061c.636-1.2 2.183-2.467 4.494-2.467 4.801 0 5.689 3.16 5.689 7.273l-.001 8.381ZM7.116 10.256a2.75 2.75 0 0 1-2.75-2.752 2.752 2.752 0 1 1 2.75 2.753Zm2.376 17.36H4.74v-15.27h4.752v15.27ZM29.333.346H2.667C1.36.346 0 1.74 0 3.013v26.666c0 1.275 1.361 2.667 2.667 2.667h26.666c1.304 0 2.667-1.392 2.667-2.666V3.012C32 1.74 30.637.346 29.333.346Z" />
        </svg>
      ),
      url: "https://www.linkedin.com/company/inheritance-development-ltd-idl/",
    },
    {
      icon: (props) => (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 33"
          width="1em"
          height="1em"
        >
          <path d="M16 .346c-4.347 0-4.89.02-6.596.096C7.7.522 6.54.79 5.52 1.186a7.835 7.835 0 0 0-2.835 1.846A7.807 7.807 0 0 0 .84 5.866C.444 6.886.175 8.046.096 9.75.016 11.457 0 12 0 16.346c0 4.347.02 4.89.096 6.596.08 1.703.348 2.864.744 3.884a7.847 7.847 0 0 0 1.845 2.835 7.825 7.825 0 0 0 2.835 1.845c1.021.395 2.181.666 3.884.744 1.707.08 2.25.096 6.596.096 4.347 0 4.89-.02 6.596-.096 1.703-.08 2.864-.35 3.884-.744a7.864 7.864 0 0 0 2.835-1.845 7.814 7.814 0 0 0 1.845-2.835c.395-1.02.665-2.181.744-3.884.08-1.707.096-2.25.096-6.596 0-4.347-.02-4.89-.096-6.596-.08-1.702-.35-2.865-.744-3.884a7.853 7.853 0 0 0-1.845-2.834 7.796 7.796 0 0 0-2.835-1.846C25.46.79 24.299.521 22.596.442 20.889.362 20.346.346 16 .346Zm0 2.88c4.27 0 4.78.022 6.467.095 1.56.073 2.406.332 2.969.553.75.29 1.28.636 1.843 1.195.558.56.905 1.092 1.194 1.841.219.563.48 1.41.551 2.97.076 1.688.093 2.194.093 6.466s-.02 4.78-.098 6.467c-.082 1.56-.342 2.407-.562 2.97-.298.748-.638 1.28-1.198 1.842a4.992 4.992 0 0 1-1.84 1.195c-.56.218-1.42.48-2.98.55-1.699.076-2.199.093-6.479.093-4.281 0-4.781-.02-6.479-.098-1.561-.081-2.421-.341-2.981-.561-.759-.3-1.28-.64-1.839-1.2a4.859 4.859 0 0 1-1.2-1.84c-.22-.56-.478-1.42-.56-2.98-.06-1.68-.081-2.198-.081-6.458 0-4.261.021-4.781.081-6.481.082-1.56.34-2.419.56-2.979.28-.76.639-1.28 1.2-1.841.559-.559 1.08-.919 1.839-1.197.56-.222 1.401-.482 2.961-.562 1.7-.06 2.2-.08 6.479-.08l.06.04Zm0 4.904a8.215 8.215 0 0 0-8.216 8.216c0 4.54 3.68 8.216 8.216 8.216 4.54 0 8.216-3.68 8.216-8.216 0-4.54-3.68-8.216-8.216-8.216Zm0 13.55a5.332 5.332 0 0 1-5.333-5.334A5.332 5.332 0 0 1 16 11.013a5.332 5.332 0 0 1 5.333 5.333A5.332 5.332 0 0 1 16 21.68ZM26.461 7.806c0 1.06-.861 1.92-1.92 1.92-1.06 0-1.92-.861-1.92-1.92a1.921 1.921 0 0 1 3.84 0Z" />
        </svg>
      ),
      url: "https://www.instagram.com/inheritancedevelopmentltd/",
    },
    {
      icon: (props) => (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="none"
        >
          <path
            fillRule="evenodd"
            d="M5.216.538C5.632.442 6.56.378 7.264.346h16.608c.192 0 .576 0 .864.032.704 0 1.632.064 2.048.16.64.128 1.248.32 1.728.576.608.288 1.12.672 1.6 1.152.448.448.832.96 1.12 1.568.256.48.448 1.088.576 1.728.096.416.16 1.344.192 2.048v16.608c0 .192 0 .576-.032.864 0 .704-.064 1.632-.16 2.048-.128.64-.32 1.248-.576 1.728a5.662 5.662 0 0 1-1.152 1.6c-.448.448-.96.832-1.568 1.12-.48.256-1.088.448-1.728.576-.416.096-1.344.16-2.048.192H8.128c-.192 0-.576 0-.864-.032-.704 0-1.632-.064-2.048-.16-.64-.128-1.248-.32-1.728-.576a5.662 5.662 0 0 1-1.6-1.152 5.586 5.586 0 0 1-1.12-1.568C.512 28.378.32 27.77.192 27.13c-.096-.416-.16-1.344-.192-2.048V8.474c0-.192 0-.576.032-.864 0-.704.064-1.632.16-2.048.128-.64.32-1.248.576-1.728a5.662 5.662 0 0 1 1.152-1.6c.448-.448.96-.832 1.568-1.12.48-.256 1.088-.448 1.728-.576Zm14.383 16.99c.261.094 1.663.784 1.948.926l.155.076c.2.096.334.161.39.257.072.119.072.69-.165 1.355-.238.665-1.377 1.273-1.924 1.355-.491.073-1.113.104-1.795-.113a16.403 16.403 0 0 1-1.625-.6c-2.671-1.154-4.477-3.741-4.819-4.232-.024-.034-.04-.058-.05-.07l-.002-.004c-.152-.202-1.162-1.55-1.162-2.944 0-1.313.645-2 .942-2.317l.056-.06c.261-.285.57-.357.76-.357.19 0 .38.002.546.01l.064.001c.166 0 .373-.002.577.489.079.188.194.467.315.762.245.597.516 1.258.564 1.353.071.143.119.309.024.5a9.507 9.507 0 0 0-.04.08 1.618 1.618 0 0 1-.245.395c-.048.055-.097.115-.146.175-.098.12-.196.239-.282.324-.142.142-.29.296-.125.581.167.285.739 1.219 1.586 1.974.91.812 1.703 1.155 2.104 1.33.078.033.141.06.188.084.285.143.451.119.617-.071.167-.19.713-.832.903-1.117.19-.286.38-.238.641-.143Zm-3.257 8.024h.004c5.226 0 9.479-4.251 9.481-9.477a9.42 9.42 0 0 0-2.774-6.706 9.418 9.418 0 0 0-6.703-2.78c-5.23 0-9.483 4.252-9.485 9.478 0 1.79.5 3.535 1.45 5.044l.225.358-.957 3.498 3.588-.941.346.205a9.468 9.468 0 0 0 4.825 1.321Zm.004-20.888a11.334 11.334 0 0 1 8.07 3.344 11.332 11.332 0 0 1 3.337 8.067c-.003 6.288-5.12 11.403-11.407 11.403h-.004c-1.91 0-3.785-.48-5.451-1.388l-6.047 1.586 1.618-5.909a11.38 11.38 0 0 1-1.523-5.7c.003-6.288 5.12-11.403 11.407-11.403Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      url: "https://wa.me/8801740062270",
    },
  ];

  return (
    <>
      <footer className="bg-secondary-300 pb-12 pt-16">
        <div className="container flex items-stretch justify-between md:flex-wrap sm:flex-wrap">
          <div className="w-3/12 md:w-4/12 sm:w-full">
            <img src="/logo-dark.svg" alt="logo" className="h-8 md:h-6" />

            <p className="mt-5 font-roboto text-xl leading-[120%] text-neutral-200 md:text-sm sm:mt-4 sm:max-w-72 sm:text-base">
              IDL is a new way of thinking about living, buying, and owning real
              estate, as well for renting purposes.
            </p>

            <h3 className="mt-5 pt-10 text-base text-primary md:hidden sm:hidden">
              Follow Us on
            </h3>
            <div className="mt-5 flex gap-4 pb-20 md:hidden sm:hidden">
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="h-8 w-8 rounded-[5px]"
                  target="_blank"
                >
                  <link.icon className="h-8 w-8 fill-secondary-500 duration-200 ease-in-out hover:fill-primary-300" />
                </a>
              ))}
            </div>
          </div>

          <div className="w-3/12 border-primary pt-8 md:w-7/12 md:pt-2 sm:my-9 sm:mb-2 sm:w-full sm:border-y-2 sm:py-9">
            <h3 className="mb-3 font-roboto text-base font-semibold text-primary md:text-base sm:text-xs">
              Contact Info
            </h3>
            <ul className="text-[#1D1D1D]">
              {contactInfo.map((info) => (
                <li
                  key={info.text}
                  className="flex max-w-[300px] items-start gap-2 border-b-[1px] border-primary-75 py-3 font-roboto text-base text-neutral-300 last:border-none hover:text-primary md:text-xl sm:border-none sm:py-1 sm:text-base"
                >
                  <div className="h-6 w-6 md:h-5 md:w-5">{info.icon}</div>
                  <h6>{info.text}</h6>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block md:w-5/12 sm:w-0"></div>
          <div className="w-2/12 pt-8 md:w-4/12 sm:w-6/12">
            <h3 className="mb-3 font-roboto text-base font-semibold text-primary md:text-base sm:text-xs">
              Quick Links
            </h3>
            <ul className="text-[#1D1D1D]">
              {links.map((link) => (
                <li key={link.url} className="py-[2px]">
                  <Link
                    href={link.url}
                    className="font-roboto text-xl text-neutral-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-2/12 pt-8 md:w-3/12 sm:w-6/12">
            <h3 className="mb-3 font-roboto text-base font-semibold text-primary md:text-base sm:text-xs">
              Projects
            </h3>
            <ul className="text-neutral-300">
              {projects.map((link) => (
                <li key={link.url} className="py-[2px]">
                  <Link
                    href={link.url}
                    className="font-roboto text-xl hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="my-3 font-roboto text-base font-semibold text-primary hover:text-primary sm:text-xs">
              Download
            </h3>
            <ul className="text-neutral-300">
              <li className="py-0">
                <Link
                  href={"/press-media/brochure"}
                  className="font-roboto text-xl hover:text-primary"
                >
                  Brochure Archive
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden md:block md:w-5/12"></div>

          <div className="hidden border-t-2 border-primary md:mt-6 md:block md:border-t-0 sm:mt-9 sm:block sm:w-full sm:py-9">
            <h3 className="font-roboto text-2xl font-semibold text-primary md:text-base sm:text-xs">
              Follow Us
            </h3>
            <div className="mt-2 flex justify-start gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="block h-8 w-8 rounded-[5px] hover:scale-110"
                  target="_blank"
                >
                  <link.icon className="block h-8 w-8 fill-secondary-500 duration-200 ease-in-out hover:fill-primary-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-secondary-300">
        <div className="container border-t-[1px] border-primary-75">
          <p className="pb-7 pt-1 text-left text-base text-neutral-75">
            &#169; 2023 Inheritance Development Ltd. All Right Reserved
          </p>
        </div>
      </div>
    </>
  );
}
