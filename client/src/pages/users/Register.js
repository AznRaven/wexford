import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { userInfo, userRegister } from "../../services/userService";

let emptyForm = {
  username: "",
  password: "",
  email: "",
  residentName: "", 
  contactNumber: "", 
  unitNumber: "", 
};

function Register({ setUser }) {
  const navigate = useNavigate();

  let [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await userRegister(form);

    if (!token) {
      setForm(emptyForm);
      return;
    }

    localStorage.setItem("token", token);

    const user = await userInfo();
    setUser(user);

    navigate("/posts");
  };

  return (
    <div className="user-auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input name="username" handleChange={handleChange} form={form} text='Username'/>
        <Input name="email" handleChange={handleChange} form={form} text='Email'/>
        <Input name="password" handleChange={handleChange} form={form} text='Password'/>
        <Input name="residentName" handleChange={handleChange} form={form} text='Resident Name'/>
        <Input name="contactNumber" handleChange={handleChange} form={form} text='Contact Number'/>
        <Input name="unitNumber" handleChange={handleChange} form={form} text='Unit Number'/>
        <button className="registerBtn centerBtn">Submit</button>
      </form>
    </div>
  );
}

export default Register;
