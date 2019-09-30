import React from "react";
import Button from "../ui/Button";
import Input from "./Input";
import Error from "../ui/Error";

const CreateAdminFrom = props => (
  <form action="" onSubmit={props.onSubmit}>
    <Input
      label="Name"
      name="name"
      bm={false}
      value={props.adminNameValue}
      onChange={props.onChange}
      placeholder="Admin name"
      className="form-control white"
    />

    <Input
      label="Email"
      name="Email"
      bm={false}
      value={props.adminEmailValue}
      onChange={props.onChange}
      placeholder="Email"
      className="form-control white"
    />

    <Input
      label="Password"
      name="Email"
      type="password"
      bm={false}
      value={props.adminEmailValue}
      onChange={props.onChange}
      placeholder="Email"
      className="form-control white"
    />

    <Error err={props.error} msg={props.errorMsg} />

    <Button type="submit" text="Create Admin" />
  </form>
);

export default CreateAdminFrom;
