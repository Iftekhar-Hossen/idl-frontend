import React from "react";
import { MapPinned, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/ui/newsletter";
import { useForm } from "react-hook-form";

const Hidden = (props) => {
  return <div className="hidden">{props.children}</div>;
};

export default function Contact() {
  let heroContact = [
    {
      name: "Location",
      icon: `<svg width="100%" height="100%"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0832 7.50008C12.0832 8.65067 11.1504 9.58341 9.99984 9.58341C8.84924 9.58341 7.9165 8.65067 7.9165 7.50008C7.9165 6.34949 8.84924 5.41675 9.99984 5.41675C11.1504 5.41675 12.0832 6.34949 12.0832 7.50008Z" stroke="#A07758" stroke-width="1.5"/>
<path d="M15.1851 14.1667C16.3472 15.8238 16.9031 16.7063 16.572 17.4167C16.5388 17.4879 16.4999 17.5567 16.4557 17.6224C15.9769 18.3334 14.7395 18.3334 12.2647 18.3334H7.73511C5.26034 18.3334 4.02296 18.3334 3.54418 17.6224C3.49996 17.5567 3.46108 17.4879 3.42787 17.4167C3.09674 16.7063 3.65264 15.8238 4.81473 14.1667" stroke="#A07758" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.0477 14.5781C10.7666 14.8488 10.3909 15.0001 9.99996 15.0001C9.609 15.0001 9.23332 14.8488 8.95226 14.5781C6.37842 12.0841 2.92916 9.29803 4.61126 5.25319C5.52076 3.06619 7.70396 1.66675 9.99996 1.66675C12.296 1.66675 14.4792 3.06619 15.3887 5.25319C17.0686 9.29293 13.6279 12.0927 11.0477 14.5781Z" stroke="#A07758" stroke-width="1.5"/>
</svg>
`,
      value: "Plot:31, Road:09, Block: H, sector -17, Uttara, Dhaka 1230",
    },
    {
      name: "Phone",
      icon: `<svg width="100%" height="100%"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.05 5C16.0267 5.19057 16.9244 5.66826 17.6281 6.37194C18.3317 7.07561 18.8094 7.97326 19 8.95M15.05 1C17.0793 1.22544 18.9716 2.13417 20.4162 3.57701C21.8609 5.01984 22.772 6.91101 23 8.94M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="#1D1D1D" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`,
      value: "+880 1740062270",
    },
    {
      name: "Email",
      icon: `<svg width="100%" height="100%"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#1D1D1D" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 6L12 13L2 6" stroke="#1D1D1D" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`,
      value: "ininheritance.ltd@gmail.com",
    },
  ];



  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(() => {
          alert("Contact details sent successfully");
        })
        .catch(() => {
          alert("Failed to send contact details");
        });
  
      alert("Contact form submitted successfully");
    } catch (error) {
      alert("An error occurred while submitting the form. Please try again later.");
    }
  };

  return (
    <>
      <div className="relative z-40 bg-foreground bg-[url(/images/mask_bg.png)] bg-cover bg-no-repeat">
        <div className="container flex flex-wrap items-end py-40 font-roboto">
          <div className="w-7/12 sm:w-full">
            <h5 className="text-lg font-normal text-secondary-500 sm:text-xs">
              Contact Us
            </h5>
            <h6 className="text-7xl font-bold text-white sm:mt-2 sm:text-3xl sm:font-medium sm:text-secondary-200">
              <span className="font-saol text-6xl font-semibold italic text-primary-300 sm:font-roboto sm:text-3xl sm:font-medium sm:not-italic sm:text-secondary-200">
                {" "}
                Call or Visit
              </span>{" "}
              Us <br />
              For Any Enquiry
            </h6>
          </div>
          <div className="w-5/12 sm:mt-5 sm:w-full">
            <ul className="text-[#1D1D1D]">
              {heroContact.map((item, index) => (
                <li key={index} className="mb-9 last:mb-0 sm:mb-5">
                  <div className="flex items-center gap-x-4 sm:gap-x-2">
                    <div
                      className="filter-primary relative h-5 w-5 sm:h-4 sm:w-4"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    ></div>
                    <span className="text-lg font-semibold leading-none text-primary sm:text-xs">
                      {item.name}
                    </span>
                  </div>
                  <p className="mt-3 text-2xl font-normal text-secondary-100 sm:mt-1 sm:max-w-[265px] sm:text-base">
                    {item.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container relative bg-secondary-100 sm:-mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.141289314469!2d90.37416030000001!3d23.8491161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14993b93009%3A0xabd5a0b3c481a02f!2sInheritance%20Development%20Ltd.!5e0!3m2!1sen!2sbd!4v1719579997362!5m2!1sen!2sbd"
          width={600}
          height={580}
          className="relative z-50 -mt-14 w-full"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="font-roboto">
        <div className="container py-40 md:py-6 sm:py-14">
          <div className="flex flex-wrap">
            <div className="w-4/12 md:flex md:flex-col md:justify-center sm:w-full">
              <h6 className="text-2xl font-normal text-primary md:text-sm sm:text-center sm:text-xs">
                Stay In Touch
              </h6>
              <p className="font-roboto text-6xl font-normal capitalize leading-tight text-foreground md:text-3xl md:font-semibold sm:text-center sm:text-3xl">
                <span className="font-saol font-semibold italic text-primary-300 md:font-roboto md:not-italic md:text-neutral-300 sm:not-italic">
                  {" "}
                  Email us
                </span>{" "}
                <br className="sm:hidden" /> we would{" "}
                <br className="hidden sm:block" /> love to from you
              </p>
            </div>
            <div className="w-2/12 md:w-0"></div>
            <div className="w-6/12 md:w-8/12 sm:mt-0 sm:w-full">
              <form className="grid grid-cols-2 sm:grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-span-2">
                  <input
                    className="w-full rounded-none border-b border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                    placeholder="Type your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <input
                    className="w-full rounded-none border-b border-r border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:border-r-0 sm:pt-8 sm:text-base"
                    placeholder="Email"
                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="col-span-1">
                  <input
                    className="w-full rounded-none border-b border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                    placeholder="Phone"
                    {...register("phone", { required: "Phone is required" })}
                  />
                  {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
                <div className="col-span-2">
                  <input
                    className="w-full rounded-none border-b border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                    placeholder="Subject"
                    {...register("subject", { required: "Subject is required" })}
                  />
                  {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
                </div>
                <div className="col-span-2">
                  <textarea
                    className="w-full resize-none rounded-none border-b border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                    placeholder="Message"
                    rows={3}
                    {...register("message", { required: "Message is required" })}
                  ></textarea>
                  {errors.message && <p className="text-red-500">{errors.message.message}</p>}
                </div>

                <div>
                  <button className="m-0 mt-6 inline-block bg-primary px-5 py-3 text-accent sm:mt-4 sm:w-full sm:py-2 sm:text-xs">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
}
