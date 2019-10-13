import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USER_QUERY } from '../graphql/Query';
import { getItemFromLocal } from '../utils/localStorage';

import Loader from '../components/ui/Loader';



const UserProfile = () => {
  const user = getItemFromLocal('user');
  console.log(user)
  const { loading, data } = useQuery(USER_QUERY, {
    variables: { id: user._id }
  });

  if (loading)
    return <Loader />;

  console.log(data)

  return (
    <>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="border-bottom text-center pb-4">
                <div className="user-avatar bg-primary" style={{background: 'url(' + data.user.avatar + ') center center no-repeat'}}></div>
                <div className="mb-3">
                  <h3>{data.user.firstName} {data.user.lastName}</h3>
                </div>
              </div>

              <div className="py-4">
                <p className="clearfix">
                  <span className="float-left">
                    Status
                  </span>
                  <span className="float-right text-muted">
                    Active
                  </span>
                </p>
                <p className="clearfix">
                  <span className="float-left">
                    Mail
                  </span>
                  <span className="float-right text-muted">
                    Jacod@testmail.com
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-8">



            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
