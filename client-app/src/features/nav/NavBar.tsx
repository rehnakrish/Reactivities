import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button,Container,Menu } from "semantic-ui-react";
import  ActivityStore  from "../../app/stores/activitystore";



export const NavBar:React.FC = () => {
  const activityStore = useContext(ActivityStore)
  const {openCreateActivityForm} = activityStore
  return (
    
    <Menu fixed="top" inverted>  
    <Container>  
        <Menu.Item header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive onClick={openCreateActivityForm} content="Create Activity"></Button>
        </Menu.Item>
        </Container>
    </Menu>
   
  );
};

export default observer(NavBar);
