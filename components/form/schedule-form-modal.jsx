import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Custom hook to manage modal state
export const useModal = () => {
  const [isOpenFormModal, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpenFormModal, open, close };
};

const ScheduleFormModal = ({ isOpen, onClose, onSubmit, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitWrapper = (data) => {
    onSubmit(data);

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

    onClose();
  };
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="z-[9999999] h-full w-full max-w-full bg-secondary-300">
        <div className="container flex items-center justify-between">
          <div className="flex h-full w-4/12 items-center justify-center lg:w-4/12 sm:hidden">
            <svg
              width="320"
              height="320"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.30194 283.188V80.1334H270.377V135.6C271.818 136.141 273.259 136.727 274.679 137.335V-0.00268555H0V287.694H152.999C152.117 286.23 151.278 284.72 150.46 283.188H4.30194ZM270.377 4.50314V75.6276H4.30194V4.50314H270.377Z"
                fill="#A07758"
              />
              <path
                d="M56.5486 36.2686H33.5547V40.7744H56.5486V36.2686Z"
                fill="#A07758"
              />
              <path
                d="M241.125 36.2686H218.132V40.7744H241.125V36.2686Z"
                fill="#A07758"
              />
              <path
                d="M202.643 36.2686H72.0574V40.7744H202.643V36.2686Z"
                fill="#A07758"
              />
              <path
                d="M138.95 127.22H179.883V148.668C181.281 147.631 182.722 146.64 184.185 145.671V127.22H225.118V130.329C226.538 130.149 227.979 129.991 229.42 129.856V127.22H239.099V122.714H229.42V111.878H225.118V122.714H184.185V111.878H179.883V122.714H138.95V111.878H134.648V122.714H93.715V111.855H89.4131V122.714H48.4801V111.855H44.1782V122.714H34.4988V127.22H44.1782V177.865H34.4988V182.371H44.1782V233.017H34.4988V237.522H44.1782V248.381H48.4801V237.522H89.4131V248.381H93.715V237.522H134.648V248.381H138.95V182.371H150.888C151.705 180.839 152.566 179.33 153.469 177.865H138.95V127.22ZM134.648 127.22V177.865H93.715V127.22H134.648ZM48.4801 127.22H89.4131V177.865H48.4801V127.22ZM48.4801 233.017V182.371H89.4131V233.017H48.4801ZM134.648 233.017H93.715V182.371H134.648V233.017Z"
                fill="#A07758"
              />
              <ellipse
                cx="237.265"
                cy="233.231"
                rx="80.8978"
                ry="84.425"
                fill="#A07758"
              />
              <path
                d="M274.677 155.786C273.257 155.042 271.838 154.322 270.375 153.668C260.18 148.96 248.93 146.346 237.1 146.346C234.518 146.346 231.959 146.481 229.421 146.729C227.98 146.864 226.538 147.045 225.119 147.247C209.696 149.59 195.629 156.394 184.186 166.375C182.702 167.659 181.282 168.988 179.884 170.362C177.539 172.728 175.302 175.229 173.216 177.864C172.054 179.329 170.936 180.838 169.882 182.37C160.03 196.631 154.223 214.114 154.18 233.016V233.173C154.18 234.638 154.223 236.08 154.287 237.522C155.083 254.463 160.547 270.144 169.344 283.188C170.377 284.72 171.473 286.23 172.614 287.694C187.821 307.384 211.073 320.001 237.1 320.001C282.808 320.001 319.998 281.048 319.998 233.173C319.998 199.447 301.543 170.159 274.677 155.786ZM237.1 315.495C213.697 315.495 192.639 304.726 178.228 287.694C177.001 286.252 175.818 284.743 174.7 283.188C165.322 270.392 159.45 254.621 158.589 237.522C158.525 236.08 158.482 234.638 158.482 233.173V233.016C158.525 213.934 164.784 196.338 175.259 182.37C176.421 180.816 177.647 179.329 178.894 177.864C179.217 177.481 179.54 177.121 179.884 176.761C181.26 175.229 182.702 173.742 184.186 172.322C195.371 161.666 209.503 154.321 225.119 151.798C226.538 151.573 227.98 151.393 229.421 151.258C231.937 150.987 234.497 150.852 237.1 150.852C248.995 150.852 260.266 153.623 270.375 158.602C271.838 159.3 273.257 160.066 274.677 160.877C299.091 174.846 315.696 202.016 315.696 233.173C315.696 278.57 280.442 315.495 237.1 315.495Z"
                fill="#A07758"
              />
              <path
                d="M270.376 250.094H230.928L202.298 220.107L205.331 216.908L232.713 245.588H270.376V250.094Z"
                fill="#A07758"
              />
            </svg>
          </div>
          <div className="w-6/12 lg:w-7/12">
            <h6 className="text-lg text-secondary-500 lg:text-base">
              Have any Interest
            </h6>
            <h3 className="font-saol text-[57px] font-semibold italic leading-[1] text-primary lg:text-3xl">
              Schedule A Meeting
            </h3>
            <h4 className="text-[57px] leading-[1.5] text-neutral-300 lg:text-3xl">
              For Enquiry
            </h4>

            <form
              onSubmit={handleSubmit(onSubmitWrapper)}
              className="mt-6 grid grid-cols-2 sm:grid-cols-2"
            >
              <div className="col-span-2">
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full rounded-none border-y border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                  placeholder="Type your name"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <input
                  {...register("email", {

                    required: false,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full rounded-none border-b border-r border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:border-r-0 sm:pt-8 sm:text-base"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <input
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full rounded-none border-b border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                  placeholder="Phone"
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </div>
              <div className="col-span-1">
                <input
                  {...register("date", { required: false })}
                  className="h-[72.5px] w-full rounded-none border-b border-r border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 focus:text-2xl lg:h-[41.6px] md:py-2 md:text-base sm:pt-8 sm:text-base"
                  placeholder="Select Date"
                  type="text"
                  min={new Date().toISOString().split("T")[0]}
                  onFocus={(e) => (e.currentTarget.type = "date")}
                />
                {errors.date && (
                  <span className="text-red-500">{errors.date.message}</span>
                )}
              </div>
              <div className="col-span-1">
                <select
                  {...register("time", { required: false })}
                  className="h-[72.5px] w-full rounded-none border-b border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 lg:h-[41.6px] md:py-2 md:text-base sm:pt-8 sm:text-base"
                  type="text"
                  placeholder="Select Time"
                  defaultValue={"morning"}
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
                {errors.time && (
                  <span className="text-red-500">{errors.time.message}</span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="m-0 mt-6 inline-block bg-primary px-5 py-3 text-accent lg:text-base sm:mt-4 sm:w-full sm:py-2 sm:text-xs"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <>
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="px-4 pb-5">
          <h3 className="pt-4 text-xl font-bold text-primary">
            Schedule A Meeting
          </h3>
          <h4 className="text-lg text-neutral-300">For Enquiry</h4>

          <form onSubmit={handleSubmit(onSubmitWrapper)}>
            <input
              {...register("name", { required: "Name is required" })}
              className="col-span-12 w-full border-2 border-x-0 border-t-0 border-[#999793] bg-transparent px-5 py-5 text-2xl outline-none focus:border-primary sm:px-1 sm:py-2 sm:text-base"
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="col-span-12 w-full border-2 border-x-0 border-t-0 border-[#999793] bg-transparent px-5 py-5 text-2xl outline-none focus:border-primary sm:px-1 sm:py-2 sm:text-base"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
            <input
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Invalid phone number",
                },
              })}
              className="col-span-12 w-full border-2 border-x-0 border-t-0 border-[#999793] bg-transparent px-5 py-5 text-2xl outline-none focus:border-primary sm:px-1 sm:py-2 sm:text-base"
              placeholder="Phone"
            />
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}

            <input
              {...register("date", { required: "Date is required" })}
              className="col-span-12 w-full border-2 border-x-0 border-t-0 border-[#999793] bg-transparent px-5 py-5 text-2xl outline-none focus:border-primary sm:px-1 sm:py-2 sm:text-base"
              placeholder="Select Date"
              type="text"
              min={new Date().toISOString().split("T")[0]}
              onFocus={(e) => (e.currentTarget.type = "date")}
            />
            {errors.date && (
              <span className="text-xs text-red-500">
                {errors.date.message}
              </span>
            )}
            <select
              {...register("time", { required: "Time is required" })}
              className="w-full border-b-2 border-[#999793] bg-transparent outline-none sm:px-1 sm:py-2 sm:text-base"
            >
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
            {errors.time && (
              <span className="text-xs text-red-500">
                {errors.time.message}
              </span>
            )}
            <Button
              type="submit"
              className="mt-4 w-full"
              onClick={handleSubmit(onSubmitWrapper)}
            >
              Submit Request
            </Button>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ScheduleFormModal;
