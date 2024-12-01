// import { Button } from 'bootstrap';
import React, { useState } from 'react';

 import { Link,useNavigate  } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #3f5159;
  height: 40px;
  padding-left: 2.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 15px;
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  let navigate = useNavigate(); 
  const showSubnav = () => {
    setSubnav(!subnav)
  };

  const onClickMenu = (item) => {
    // console.log(item)
    if(item.subNav !== undefined){ 
      showSubnav();
      // <Link to={item.path}/>
    }
    else{
      let path = item.path; 
      navigate(path);
    }
  }

  return (
    <>
      {item.title && <button className='submenu'  onClick={()=>onClickMenu(item)}>
        <div>
          {item.icon}
          <SidebarLabel >{item.title}</SidebarLabel>
        </div>
        
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </button>}
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink  to={item.path} key={index}>
              {item.icon}
              <SidebarLabel >{item.title}</SidebarLabel>
            </DropdownLink>
          );
      })}
    </>
  );
};

export default SubMenu;