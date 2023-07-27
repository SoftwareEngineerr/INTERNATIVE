import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Outlet, useNavigate } from 'react-router';

export const Verify = (props) => {

      const [permission , setPermission] = useState(true);
      let navigate = useNavigate();
      const gettoken =  localStorage.getItem("getiemss");
  return (
    <>
    {
        gettoken != undefined || gettoken != null ?
            null
        :
            navigate('/login')
    }
    </>
  )
}