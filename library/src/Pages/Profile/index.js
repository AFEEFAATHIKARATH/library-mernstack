import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";

import Users from "./Users";
import Books from "./Books";


function Profile() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Books" key="1">
          <Books />
        </TabPane>
        <TabPane tab="Users" key="2">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
