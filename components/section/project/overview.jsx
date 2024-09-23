import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Reusable Input Component
const FormInput = ({ placeholder }) => (
  <input
    className="col-span-12 w-full border-2 border-x-0 border-t-0 border-[#999793] bg-transparent px-5 py-5 text-2xl outline-none focus:border-primary sm:px-1 sm:py-2 sm:text-base"
    placeholder={placeholder}
  />
);

// Reusable Modal or Drawer Component
const ModalOrDrawer = ({ isDesktop, open, setOpen, triggerText, children }) => {
  const TriggerButton = (
    <button className="inline-block sm:block  w-full border-2 border-primary px-4 py-3 text-xl text-background duration-300 hover:bg-primary sm:px-2 sm:py-2 sm:text-sm">
      {triggerText}
    </button>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="z-[9999] h-screen w-full max-w-full">
        {children}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="px-4">{children}</DrawerContent>
    </Drawer>
  );
};

// Form Template Component
const FormTemplate = ({ title, subtitle, buttonText, className }) => (
  <div className={className}>
    <div className="m-auto grid h-full max-w-7xl grid-cols-12 gap-4 sm:h-auto">
      <div className="col-span-4 flex h-full items-center sm:col-span-12 sm:h-auto">
        {/* SVG Icon */}
        <svg
          width="336"
          height="337"
          className="sm:h-16 sm:w-16"
          viewBox="0 0 336 337"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG Content */}
        </svg>
      </div>
      <div className="col-span-8 flex h-full flex-col justify-center sm:col-span-12 sm:h-auto">
        <h3 className="font-roboto text-xl text-secondary-500 sm:text-sm">
          {title}
        </h3>
        <h2 className="text-5xl leading-tight text-neutral sm:text-xl">
          {subtitle}
        </h2>
        <form className="mt-5 grid grid-cols-12 gap-4 sm:mt-3 sm:gap-2">
          <FormInput placeholder="Type your name" />
          <FormInput placeholder="Email Address" />
          <FormInput placeholder="Phone Number" />
          <p className="col-span-12 text-xs text-primary">
            We use the information you provide to contact you about our relevant
            content, products, and services.
          </p>
          <Button className="col-span-12 text-white">{buttonText}</Button>
        </form>
      </div>
    </div>
  </div>
);

// Register Interest Component
const RegisterIntrest = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <ModalOrDrawer
      isDesktop={isDesktop}
      open={open}
      setOpen={setOpen}
      triggerText="Schedule a meeting"
    >
      <FormTemplate
        title="Have any Interest"
        subtitle="Schedule A Meeting For Enquiry"
        buttonText="Submit Request"
      />
    </ModalOrDrawer>
  );
};

// Download Brochure Component
const DownloadBrochure = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <ModalOrDrawer
      isDesktop={isDesktop}
      open={open}
      setOpen={setOpen}
      triggerText="Brochure"
    >
      <FormTemplate
        title="Brochure"
        subtitle="Access The Brochure Now"
        buttonText="Download Brochure"
      />
    </ModalOrDrawer>
  );
};

export const Overview = ({
  name,
  address,
  appartement_size,
  current_status,
  completion_date,
  bedrooms,
}) => {
  return (
    <section className="bg-foreground py-48 pb-96 font-roboto sm:py-32">
      <div className="container flex flex-wrap items-end">
        <div className="w-8/12 sm:w-full">
          <div>
            <h5 className="text-base md:text-xs font-normal text-background sm:text-xs">
              Elevate your life style with
            </h5>
            <h4 className="font-saol md:text-4xl text-5xl font-semibold italic text-primary-300 sm:text-3xl sm:font-medium">
              {name}
            </h4>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid sm:grid-cols-12 sm:gap-2">
              <div className="sm:col-span-6">
                {" "}
                <RegisterIntrest />
              </div>

              <div className="sm:col-span-6">
              
                <DownloadBrochure />
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 font-roboto sm:mt-10 sm:w-full">
          <div className="grid grid-cols-2 gap-8 sm:gap-4">
            <div className="col-span-2">
              <h5 className="text-base md:text-xs font-normal text-primary sm:text-xs sm:font-medium">
                Project Location
              </h5>
              <h4 className="text-[23px] md:text-xl font-normal leading-9 text-background sm:text-base sm:font-normal">
                {address.address_line_1}, {address.address_line_2}
              </h4>
            </div>
            <div className="">
              <h5 className="text-base  md:text-xs font-normal text-primary sm:text-xs sm:font-medium">
                Apartment Size
              </h5>
              <h4 className="text-[23px] md:text-xl font-semibold leading-9 text-background sm:text-base sm:font-normal">
                {appartement_size}
              </h4>
            </div>
            <div className="">
              <h5 className="text-base md:text-xs font-normal text-primary sm:text-xs sm:font-medium">
                Bedroom
              </h5>
              <h4 className="text-[23px] md:text-xl font-semibold leading-9 text-background sm:text-base sm:font-normal">
                {bedrooms} {bedrooms > 1 ? "Bedrooms" : "Bedroom"}
              </h4>
            </div>
            <div className="">
              <h5 className="text-base md:text-xs font-normal text-primary sm:text-xs sm:font-medium">
                Completion Date
              </h5>
              <h4 className="text-[23px] md:text-xl font-semibold leading-9 text-background sm:text-base sm:font-normal">
                {completion_date}
              </h4>
            </div>
            <div className="">
              <h5 className="text-base md:text-xs font-normal text-primary sm:text-xs sm:font-medium">
                Status
              </h5>
              <h4 className="text-[23px] md:text-xl font-semibold leading-9 text-background sm:text-base sm:font-normal">
                {current_status}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
