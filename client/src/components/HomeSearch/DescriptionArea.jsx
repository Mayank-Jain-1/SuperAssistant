import Video from "./Video";
import VideoDesc from "./VideoDesc";

const DescriptionArea = ({videoURL, description}) => {
   return (
      <div className=" flex flex-col lg:flex-row items-center space-x-5">
         <Video
            className="w-full lg:w-1/2"
            videoURL={videoURL}
         />
         <VideoDesc className="w-full lg:w-1/2" description={description} />
      </div>
   );
};

export default DescriptionArea;
