// FAQ.tsx  
import React from "react";  
import "./Footer.css";  

const acordData = [
  {question: "What is Netflix?",answer:"Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",},
  {question: "How much does Netflix cost?",answer: "Netflix offers several membership plans to choose from.",},
  {question: "Where can I watch?",answer:"You can watch Netflix on smart TVs, game consoles, streaming media players, set-top boxes, smartphones, and tablets.",},
  {question: "How do I cancel?",answer:"You can cancel your subscription at any time on your account page.",},
  {question: "What can I watch from Netflix?",answer:"Netflix has a vast library of content including original series and popular movies.",},
  {question: "Is Netflix good for kids?",answer:"Yes, Netflix has a dedicated kids section with age-appropriate content.",},
];

const noteData = [  
  "FAQ",  
  "Help Centre",  
  "Relations Jobs",  
  "Privacy",  
  "Speed Test", 
  "Cookie Preferences",  
  "Legal Notices",  
  "Account", 
  "Ways to Watch",  
  "Corporate Information",  
  "Only on Netflix",  
  "Media Centre",  
  "Contact Us",  
];  

const FAQ: React.FC = () => {  
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);  

  const toggleFAQ = (index: number) => {  
    setOpenIndex(openIndex === index ? null : index);  
  };  

  return (  
    <div className="bg-[#111] text-white p-8 flex flex-col items-center  ">  
      <h1 className=" font-bold my-3 mb-9 title1 text-lg md:text-xl lg:text-3xl xl:text-4xl ">  
        Frequently Asked Questions  
      </h1>  
      <div className=" space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-4 w-[66%] mx-auto">  
        {acordData.map((item, index) => (  
          <div key={index} className=" bg-[#303030] ps-4 py-3 rounded acord ">  
            <button  
              onClick={() => toggleFAQ(index)}  
              className={  `w-full text-left text-lg font-medium focus:outline-none  acord`}
            >  
              <span className={` ${openIndex === index?"border-b pb-1":""}`}>{item.question}</span>  
            </button>  
            {openIndex === index && <p className="mt-2 ps-5 text-gray-100">{item.answer}</p>}
          </div>  
        ))}
      </div>  
      <div className="mt-15 flex-col items-center w-[90%]  ">  
        <div className="mx-auto  ">
          <p className=" mb-8 mx-auto title w-[50%] text-sm md:text-base lg:text-lg xl:text-2xl">  
             Enter your email to create or restart your  
            membership. 
          </p>  
        </div> 
        <div className="mx-auto w-[60%] "><input 
          type="email" 
          placeholder="Enter your email"
          className="p-3 rounded border border-gray-600 bg-white text-[#111]  font-bold inp w-[75%] text-sm md:text-base lg:text-lg xl:text-xl"  
        />
        <button className="bg-red-600 text-white p-3 rounded ml-2 font-bold tracking-wider btnc w-[20%] text-sm md:text-base lg:text-lg xl:text-lg">Started 
        </button></div>
        
      </div>  
      <hr className="border-3 w-screen mt-10 border-gray-600" />  
      <div className="mx-auto w-[66%] ">
        <p className="text-white-400 mt-15 mb-8 phone">Questions? Call  <a className="text-red-600 border-b ms-2 phone" href="">000-800-040-1843</a></p>
      <div className="grid grid-cols-4 gap-4 mb-1 mx-auto grids  ">  
        {noteData.map((note, index) => ( 
          <div key={index}>
                     <a className="detail text-white-400 hover:underline text-xs md:text-sm lg:text-base xl:text-md" href="">{note}</a>  
          </div>  
        ))}  
      </div> 
      </div>
    </div>
      
  );  
};  

export default FAQ;  