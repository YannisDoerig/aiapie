import React, { useState, useRef } from "react";
import { sendContactForm } from "services";

const Contact = () => {
  const [message, setMessage] = useState("");
  const formRef = useRef();
  const submitContact = async (e) => {
    e.preventDefault();
    console.log(e);
    const res = await sendContactForm({
      name: e.target[0].value,
      email: e.target[1].value,
    });
    if (res == 0) {
      setMessage("Congratulations! Registration was Succesfull!");
      formRef.current.reset();
    } else {
      setMessage("Something went wrong! Please try again");
    }
  };

  return (
    <div className="container max-w-2xl text-center">
      <h1>{"Contact Us"}</h1>
      <div>
        <div>
          {message}
          <span onClick={() => setMessage("")}>&times;</span>
        </div>
        <form ref={formRef} onSubmit={submitContact}>
          <input
            required
            placeholder="Name*"
            type={"text"}
            minLength={3}
            maxLength={25}
          />
          <input required placeholder="Email Address*" type={"email"} />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
