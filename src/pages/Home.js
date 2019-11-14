import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';



import Header from '../components/Header';
import Banner from '../components/Banner';
import Title from '../components/Title';
import WithLoader from '../components/ui/WithLoader';
import HospitalCard from '../components/hospital/HospitalCard';
import Row from '../components/ui/Row';
import Col from '../components/ui/Col';

import bg from "../img/banner.jpg";
import { HOSPITAL_QUERY } from '../graphql/query/hospitalQuery';

const Home = () => {
  const [hospitals, setHospitals] = useState([]);

  const { loading } = useQuery(HOSPITAL_QUERY, {
    onCompleted: (data) => setHospitals(data.hospitals)
  })

  const onHospitalClick = (hospital) => console.log(hospital);

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
            </Row>
          </WithLoader>
        </div>
      </section>
    </>
  );
}

export default Home;
