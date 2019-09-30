import React from "react";
import Button from "../ui/Button";
import Input from "./Input";
import Error from "../ui/Error";

const CreateAdminFrom = props => (
  <form action="" onSubmit={props.onSubmit}>
    <Input
      name="firstName"
      value={props.adminFirstnameValue}
      onChange={props.onChange}
      placeholder="Firstname"
      className="form-control white"
    />

    <Input
      name="lastName"
      value={props.adminLastnameValue}
      onChange={props.onChange}
      placeholder="Lastname"
      className="form-control white"
    />

    <Input
      name="email"
      value={props.adminEmailValue}
      onChange={props.onChange}
      placeholder="Email"
      className="form-control white"
    />

    <Input
      name="password"
      type="password"
      value={props.adminPasswordValue}
      onChange={props.onChange}
      placeholder="Temporary password"
      className="form-control white"
    />

    <Error err={props.error} msg={props.errorMsg} />

    <Button type="submit" text="Create Admin" />
  </form>
);

export default CreateAdminFrom;
