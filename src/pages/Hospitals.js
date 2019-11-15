import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import LayoutPublic from '../hoc/LayoutPublic';
import WithLoader from '../components/ui/WithLoader';
import Title from '../components/Title';
import Row from '../components/ui/Row';
import Col from '../components/ui/Col';
import HospitalCard from "../components/hospital/HospitalCard";

import bg from '../img/inner-page-banner.jpg';
import { HOSPITAL_QUERY } from '../graphql/Query';

const Hospitals = () => {
  const { loading, data } = useQuery(HOSPITAL_QUERY);

  return (
    <LayoutPublic bg={bg} text="Hospitals" small={true}>
      <section>
        <div className="container">
          <Title
            text="All Hospitals Listing"
            sub="Find Specialize hospitals near you."
          />

          <WithLoader loading={loading}>
            <Row>
              {data &&
                data.hospitals.map(hospital => (
                  <Col take={4} key={hospital.id}>
                    <HospitalCard
                      title={hospital.name}
                      location={hospital.location}
                      img={hospital.coverphoto}
                      // onClick={() => onHospitalClick(hospital)}
                    />
                  </Col>
                ))}
            </Row>
          </WithLoader>
        </div>
      </section>
    </LayoutPublic>
  );
}

export default Hospitals;
