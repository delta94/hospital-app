import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import LayoutPublic from '../hoc/LayoutPublic';
import WithLoader from '../components/ui/WithLoader';
import Title from '../components/Title';
import Row from '../components/ui/Row';
import Col from '../components/ui/Col';
import Card from '../components/card/Card';

import bg from '../img/inner-page-banner.jpg';
import { DOCTORS_QUERY } from '../graphql/Query';

const Doctors = () => {
  const { loading, data } = useQuery(DOCTORS_QUERY);

  return (
    <LayoutPublic bg={bg} text="Doctors" small={true}>
      <section>
        <div className="container">
          <Title
            text="All Doctors Listing"
            sub="Find specialist that you want to appoint."
          />

          <WithLoader loading={loading}>
            <Row>
              {data && data.doctors.map(({ doctor }) => (
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
            </Row>
          </WithLoader>
        </div>
      </section>
    </LayoutPublic>
  );
}

export default Doctors;
