export default function ProjectCard({ project }) {
  return (
    <>
      <style>
        {`
        .pc-container{
            transition:  0.3s ease-in-out;
        }
        .pc-text{
            transition:  0.3s ease-in-out;
            
        }
.pc-container:hover .pc-text {
    top: 0;
}
    `}
      </style>
      <div className="pc-container w-1/4 relative h-96 overflow-hidden">
        <div className="relative transition duration-0 hover:duration-150 h-full hover:scale-105 ">
          <img
            layout="fill"
            className="h-full w-full "
            src="/images/project.png"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1D1D1D] opacity-60 transition-opacity duration-300 hover:opacity-90"></div>
          <div className="pc-text absolute transition duration-0 hover:duration-150 bottom-0 ">
            {" "}
            <h5 className="text-white text-2xl font-bold">Project Name</h5>
            <p className="text-white text-lg">Location</p>
          </div>
        </div>
      </div>
    </>
  );
}
