import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import Header from "../components/Header";
import Banner from "../components/Banner";
import Title from "../components/Title";
import WithLoader from "../components/ui/WithLoader";
import HospitalCard from "../components/hospital/HospitalCard";
import Row from "../components/ui/Row";
import Col from "../components/ui/Col";
import Button from "../components/ui/Button";
import Card from "../components/card/Card";

import bg from "../img/banner.jpg";
import { HOSPITAL_QUERY, DOCTORS_QUERY } from "../graphql/Query";

const Home = ({history}) => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const { loading } = useQuery(HOSPITAL_QUERY, {
    onCompleted: data => setHospitals(data.hospitals)
  });

  const { loading: doctorLoading } = useQuery(DOCTORS_QUERY, {
    onCompleted: data => setDoctors(data.doctors)
  });

  const onHospitalClick = hospital => console.log(hospital);

  return (
    <>
      <Header home />
      <Banner
        img={bg}
        text="Find Best Hospital/Doctor <br />and Make an appointment."
      />

      <section>
        <div className="container">
          <Title
            text="Find best hospital"
            sub="We have over 400 Hospital listing"
          />

          <WithLoader loading={loading}>
            <Row>
              {hospitals.map(hospital => (
                <Col take={4} key={hospital.id}>
                  <HospitalCard
                    title={hospital.name}
                    location={hospital.location}
                    img={hospital.coverphoto}
                    onClick={() => onHospitalClick(hospital)}
                  />
                </Col>
              ))}

              <Col take={12}>
                <div className="text-center pt-3">
                  <Button
                    text="View All"
                    onClick={() => history.push("/hospitals")}
                  />
                </div>
              </Col>
            </Row>
          </WithLoader>
        </div>
      </section>

      <section className="grey">
        <div className="container">
          <Title
            text="Find Best doctor"
            sub="Hospital wise doctor lists also available"
          />

          <WithLoader loading={doctorLoading}>
            <Row>
              {doctors.map(({ doctor }) => (
                <Col take={4} key={doctor.id}>
                  <Card
                    firstName={doctor.firstName}
                    lastName={doctor.lastName}
                    avatar={doctor.avatar}
                    bio={doctor.bio}
                    specialties={doctor.specialties}
                  />
                </Col>
              ))}

              <Col take={12}>
                <div className="text-center pt-3">
                  <Button
                    text="View All"
                    onClick={() => history.push("/doctors")}
                  />
                </div>
              </Col>
            </Row>
          </WithLoader>
        </div>
      </section>
    </>
  );
};

export default Home;
