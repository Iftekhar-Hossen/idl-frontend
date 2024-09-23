import React from "react";
import { Input } from "./input";
import { Button } from "./button";
export function Newsletter(props) {
  let [email, setEmail] = React.useState("");
  let [error, setError] = React.useState("");
  let [success, setSuccess] = React.useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
    } else {
      alert("dfgsd");
      fetch(process.env.NEXT_PUBLIC_API_URL + "/items/newsletter_contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setSuccess(true);
            setError("");
            alert("Newsletter subscribed successful");
          } else {
            setError(true);
            setSuccess("");
          }
        })
        .catch((error) => {
          setError(true);
          setSuccess(false);
        });
    }
  };

  return (
    <section className="bg-foreground" {...props}>
      <div className="container flex items-center justify-around py-20 sm:flex-wrap sm:px-16 sm:py-6">
        <div className="w-4/12 md:w-5/12 sm:w-full">
          <h3 className="font-roboto text-[57px] font-normal capitalize leading-tight text-secondary-300 lg:text-4xl md:text-3xl sm:text-center sm:text-xl sm:font-normal">
            Subscribe to our{" "}
            <span className="text-700 font-saol text-primary">newsletter</span>
          </h3>
        </div>
        <div className="w-3/12 md:w-0 sm:w-0"></div>
        <div className="w-5/12 md:w-6/12 sm:w-full">
          <p className="text-base text-secondary-300 md:text-sm sm:text-center sm:text-sm">
            <span className="text-sm leading-[120%] md:hidden sm:hidden">
              {" "}
              To receive updates about exclusive experiences, Mondiale events,
              upcoming projects and more, please enter your details below.
            </span>
            <span className="hidden md:inline-block sm:inline-block">
              Get all the latest update easily
            </span>
          </p>
          <form onSubmit={handleNewsletter} className="mt-3 flex items-stretch">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              className="h-[54px] border-none border-[#262626] bg-[#262626] px-6 font-roboto text-white outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 md:h-[48px] sm:text-sm sm:font-normal"
              placeholder="Enter your Email address"
              disabled={success}
            />
            <Button
              type="submit"
              className="h-[54px] w-[115px] font-roboto text-white md:h-[48px] sm:text-base sm:font-normal"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
