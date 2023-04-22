import DescriptionArea from "../components/HomeSearch/DescriptionArea";
import QuestionArea from "../components/HomeSearch/QuestionArea";
import Navbar from "../components/Navbar/Navbar";

const HomeSearch = () => {
   const description = `ServiceNow Development Training | Learn Basics and Advance Scripting Concepts | ServiceNow Developer
  This #1 ServiceNow Development Training demonstrate that how to create user in ServiceNow, how to create role in ServiceNow and how to create role in ServiceNow in given. Along with this ServiceNow tool brief introduction, how to assign role to user and how to add user in group etc has been given in this video. This video helps to understand the very basics of ServiceNow. 
  
  The is First video of ServiceNow Development Training Series. Please do subscribe  my YouTube channel and click on bell icon to receive upcoming ServiceNow training online video's notifications.
  
  For ServiceNow Development Training Notes and Theoretical Concepts, Please Navigate below link:
  
  https://www.basicoservicenowlearning.in
  
  Please do provide your feedback or suggestions in below comment box.
  
   Thank you !!!!`;

   const videoURL = "https://www.youtube.com/embed/oL1uem6-3m4";

   return (
      <div>
         <Navbar />
         <div className="w-full flex flex-col items-center my-5">
            <div className="w-full max-w-7xl p-3 md:p-5">
               <DescriptionArea description={description} videoURL={videoURL} />
               <QuestionArea className="my-5"/>
            </div>
         </div>
      </div>
   );
};

export default HomeSearch;
