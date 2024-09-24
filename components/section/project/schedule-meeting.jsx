import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  date: z.coerce.date("Invalid date").min(new Date(), "Invalid date"),
  time: z.string().min(1, "Time is required"),
});
export function ScheduleMeeting() {
  const {
    register,
    handleSubmit,
resetField,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/items/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Thanks for your message. We will get back to you soon");
        resetField("name");
        resetField("email");
        resetField("phone");
        resetField("date");
        resetField("time");

      } else {
        alert("Failed to send message");
      }
    });
  };

  return (
    <>
      <div id="meeting" className="container pb-16 md:py-6 sm:py-14">
        <div className="flex flex-wrap">
          <div className="w-4/12 md:flex md:flex-col md:justify-center sm:w-full">
            <h6 className="text-2xl font-normal text-primary md:text-sm sm:text-center sm:text-xs">
              Have any Interest
            </h6>
            <p className="mt-2 font-roboto text-6xl font-semibold capitalize leading-none text-foreground md:text-3xl md:font-semibold sm:text-center sm:text-3xl">
              Schedule a meeting for enquiry
            </p>
          </div>
          <div className="w-2/12 md:w-0"></div>
          <div className="w-6/12 md:w-8/12 sm:mt-0 sm:w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 sm:grid-cols-2"
            >
              <div className="col-span-2">
                <input
                  {...register("name")}
                  className="w-full rounded-none border-y border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                  placeholder="Type your name"
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <input
                  {...register("email")}
                  className="w-full rounded-none border-b border-r border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:border-r-0 sm:pt-8 sm:text-base"
                  placeholder="Email"
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <input
                  {...register("phone")}
                  className="w-full rounded-none border-b border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                  placeholder="Phone"
                />
              </div>
              <div className="col-span-1">
                <input
                  {...register("date")}
                  className="w-full rounded-none first-letter: border-b border-r border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 focus:text-2xl md:py-2 md:text-base sm:pt-8 sm:text-base"
                  placeholder="Select Date"
                  type="text"
                  min={new Date().toISOString().split("T")[0]}
                  onFocus={(e) => (e.currentTarget.type = "date")}
                />
              </div>
              <div className="col-span-1">
                <select
                  {...register("time")}
                  className="w-full rounded-none border-b border-primary bg-transparent px-4 py-5 text-2xl text-primary-200 outline-none placeholder:text-secondary-400 md:py-2 md:text-base sm:pt-8 sm:text-base"
                  type="text"
                  placeholder="Select Time"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="m-0 mt-6 inline-block bg-primary px-5 py-3 text-accent sm:mt-4 sm:w-full sm:py-2 sm:text-xs"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
