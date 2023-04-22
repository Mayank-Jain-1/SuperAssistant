const Video = ({ className, videoURL }) => {
   return (
      <iframe
         className={`${className} aspect-video h-min`}
         src={videoURL}
         title="#1 ServiceNow Development Training - Users, Group and Role | ServiceNow Training Online"
         frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         allowfullscreen
      ></iframe>
   );
};

export default Video;
