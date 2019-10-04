import React from "react";
import Button from "../ui/Button";
import Input from "./Input";
import Error from "../ui/Error";

const CreateAdminFrom = props => (
  <form action="" onSubmit={props.onSubmit}>
    <Input
      name="firstName"
      bm={true}
      value={props.adminFirstnameValue}
      onChange={props.onChange}
      placeholder="Firstname"
      className="form-control white"
    />

    <Input
      name="lastName"
      bm={true}
      value={props.adminLastnameValue}
      onChange={props.onChange}
      placeholder="Lastname"
      className="form-control white"
    />

    <Input
      name="email"
      bm={true}
      value={props.adminEmailValue}
      onChange={props.onChange}
      placeholder="Email"
      className="form-control white"
    />

    <Input
      name="password"
      bm={true}
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
