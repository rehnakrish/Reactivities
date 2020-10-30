import React from "react";
import { Button,Container,Menu } from "semantic-ui-react";

interface IProps{
  openCreateActivityForm: () => void;
}

export const NavBar:React.FC<IProps> = ({openCreateActivityForm}) => {
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
