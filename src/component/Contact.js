import React from "react";

const Contact = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl p-4 m-4">contact US </h1>
      <form>
        <input type="text" className="border-black p-2 m-2" placeholder="Enter Name" />
        <input type="text" className="border-black p-2 m-2" placeholder="Message"  />
        <button className="border-black p-2 m-2 bg-gray-100 rounded-lg">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
