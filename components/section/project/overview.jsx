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
import Link from "next/link";
import { motion } from "framer-motion";
import ScheduleFormModal, {
  useModal,
} from "@/components/form/schedule-form-modal";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Reusable Modal or Drawer Component
const ModalOrDrawer = ({ isDesktop, open, setOpen, triggerText, children }) => {
  const TriggerButton = (
    <button className="inline-block border-2 border-primary px-4 py-3 text-xl text-background duration-300 hover:bg-primary sm:block sm:px-2 sm:py-2 sm:text-sm">
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

import { useForm } from "react-hook-form";
import axios from "axios";

// Download Brochure Component
const DownloadBrochure = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <ModalOrDrawer
      isDesktop={isDesktop}
      open={open}
      setOpen={setOpen}
      triggerText="Brochure"
    >
      <div className="container m-auto grid h-full grid-cols-12 gap-4 sm:h-auto">
        <div className="col-span-4 flex h-full items-center sm:col-span-12 sm:hidden sm:h-auto sm:pt-2">
          <svg
            width="240"
            height="272"
            viewBox="0 0 240 272"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.83862 68.2142H206.578V122.5V190.19M2.83862 68.2142V239.784H43.0506M2.83862 68.2142C54.4437 53.9168 161.675 20.7646 177.76 2.53528V44.0875M2.83862 68.2142L100.017 2.53528V19.9605M43.0506 239.784V95.6924M43.0506 239.784H159.412M75.2199 180.807H173.068M75.2199 201.583H173.068M78.5709 95.6924V152.659H173.068V95.6924H78.5709Z"
              stroke="#1D1D1D"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              cx="206.578"
              cy="238.07"
              r="31.1328"
              stroke="#A07758"
              stroke-width="4"
            />
            <path
              d="M197.239 248.523C196.135 248.523 195.239 249.419 195.239 250.523C195.239 251.628 196.135 252.523 197.239 252.523V248.523ZM215.919 252.523C217.024 252.523 217.919 251.628 217.919 250.523C217.919 249.419 217.024 248.523 215.919 248.523V252.523ZM214.29 236.697C215.031 235.877 214.966 234.612 214.146 233.872C213.326 233.132 212.061 233.196 211.321 234.016L214.29 236.697ZM209.881 238.596L211.366 239.937L211.366 239.937L209.881 238.596ZM203.277 238.596L201.792 239.937L201.792 239.937L203.277 238.596ZM201.837 234.016C201.097 233.196 199.833 233.132 199.013 233.872C198.193 234.612 198.128 235.877 198.868 236.697L201.837 234.016ZM208.579 222.504C208.579 221.399 207.684 220.504 206.579 220.504C205.475 220.504 204.579 221.399 204.579 222.504H208.579ZM197.239 252.523H215.919V248.523H197.239V252.523ZM211.321 234.016L208.397 237.256L211.366 239.937L214.29 236.697L211.321 234.016ZM204.762 237.256L201.837 234.016L198.868 236.697L201.792 239.937L204.762 237.256ZM208.397 237.256C207.579 238.162 207.1 238.686 206.718 239.009C206.372 239.302 206.384 239.183 206.579 239.183V243.183C207.742 243.183 208.627 242.634 209.3 242.064C209.938 241.525 210.627 240.756 211.366 239.937L208.397 237.256ZM201.792 239.937C202.532 240.756 203.22 241.525 203.858 242.064C204.532 242.634 205.417 243.183 206.579 243.183V239.183C206.775 239.183 206.787 239.302 206.44 239.009C206.058 238.686 205.579 238.162 204.762 237.256L201.792 239.937ZM208.579 241.183V222.504H204.579V241.183H208.579Z"
              fill="#A07758"
            />
          </svg>
        </div>
        <div className="col-span-8 flex h-full flex-col justify-center sm:col-span-12 sm:h-auto sm:pt-3">
          <h3 className="font-roboto text-xl text-secondary-500 sm:text-sm">
            Brochure
          </h3>
          <h2 className="text-5xl leading-tight text-neutral sm:text-xl">
            Access The Brochure Now
          </h2>
          <form
            className="mt-5 grid grid-cols-12 gap-4 sm:mt-3 sm:gap-2 sm:pb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              placeholder="Type your name"
              {...register("name", { required: "Name is required" })}
              className="col-span-12 w-full border-2 border-x-0 border-t-0 border-[#999793] bg-transparent px-5 py-5 text-2xl outline-none focus:border-primary sm:px-1 sm:py-2 sm:text-base"
            />

            {errors.name && (
              <p className="col-span-12 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}

            <input
              placeholder="Type your name"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="col-span-12 w-full border-2 border-x-0 border-t-0 border-[#999793] bg-transparent px-5 py-5 text-2xl outline-none focus:border-primary sm:px-1 sm:py-2 sm:text-base"
            />

            {errors.email && (
              <p className="col-span-12 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}

            <input
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              className="col-span-12 w-full border-2 border-x-0 border-t-0 border-[#999793] bg-transparent px-5 py-5 text-2xl outline-none focus:border-primary sm:px-1 sm:py-2 sm:text-base"
            />

            {errors.phone && (
              <p className="col-span-12 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
            <p className="col-span-12 text-xs text-primary">
              We use the information you provide to contact you about our
              relevant content, products, and services.
            </p>
            <Button className="col-span-12 text-white" type="submit">
              Download Brochure
            </Button>
          </form>
        </div>
      </div>
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
  const { isOpenFormModal, open, close } = useModal();

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    // Handle the form submission
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-foreground py-48 pb-96 font-roboto sm:py-32"
    >
      <div className="container flex flex-wrap items-end">
        <motion.div variants={fadeInUp} className="w-8/12 sm:w-full">
          <div>
            <motion.h5
              variants={fadeIn}
              className="text-base font-normal text-background md:text-xs sm:text-xs"
            >
              Elevate your lifestyle with
            </motion.h5>
            <motion.h4
              variants={scaleIn}
              className="font-saol text-5xl font-semibold italic text-primary-300 md:text-4xl sm:text-3xl sm:font-medium"
            >
              {name}
            </motion.h4>
            <motion.div
              variants={fadeInUp}
              className="mt-6 flex gap-x-10"
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={open}
                className="inline-block border-2 border-primary px-4 py-3 text-center text-xl text-background duration-300 hover:bg-primary sm:block sm:px-2 sm:py-2 sm:text-sm"
              >
                Schedule a meeting
              </button>
              <div className="sm:col-span-6">
                <DownloadBrochure />
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={container}
          className="w-4/12 font-roboto sm:mt-10 sm:w-full"
        >
          <div className="grid grid-cols-2 gap-8 sm:gap-4">
            <motion.div variants={fadeInUp} className="col-span-2">
              <h5 className="text-base font-normal text-primary md:text-xs sm:text-xs sm:font-medium">
                Project Location
              </h5>
              <h4 className="text-[23px] font-normal leading-9 text-background md:text-xl sm:text-base sm:font-normal">
                {address.address_line_1}, {address.address_line_2}
              </h4>
            </motion.div>
            <motion.div variants={scaleIn}>
              <h5 className="text-base font-normal text-primary md:text-xs sm:text-xs sm:font-medium">
                Apartment Size
              </h5>
              <h4 className="text-[23px] font-semibold leading-9 text-background md:text-xl sm:text-base sm:font-normal">
                {appartement_size}
              </h4>
            </motion.div>
            <motion.div variants={scaleIn}>
              <h5 className="text-base font-normal text-primary md:text-xs sm:text-xs sm:font-medium">
                Bedroom
              </h5>
              <h4 className="text-[23px] font-semibold leading-9 text-background md:text-xl sm:text-base sm:font-normal">
                {bedrooms} {bedrooms > 1 ? "Bedrooms" : "Bedroom"}
              </h4>
            </motion.div>
            <motion.div variants={scaleIn}>
              <h5 className="text-base font-normal text-primary md:text-xs sm:text-xs sm:font-medium">
                Completion Date
              </h5>
              <h4 className="text-[23px] font-semibold leading-9 text-background md:text-xl sm:text-base sm:font-normal">
                {completion_date}
              </h4>
            </motion.div>
            <motion.div variants={scaleIn}>
              <h5 className="text-base font-normal text-primary md:text-xs sm:text-xs sm:font-medium">
                Status
              </h5>
              <h4 className="text-[23px] font-semibold leading-9 text-background md:text-xl sm:text-base sm:font-normal">
                {current_status}
              </h4>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <ScheduleFormModal
        isOpen={isOpenFormModal}
        onClose={close}
        onSubmit={handleSubmit}
        title="User Information"
      />
    </motion.section>
  );
};
