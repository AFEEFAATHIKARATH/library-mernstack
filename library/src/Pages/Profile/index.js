import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import Books from "./Books";
import Users from "./Users";

function Profile() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Books" key="1">
          <Books />
        </TabPane>
        <TabPane tab="Patrons" key="2">
          <Users
          role="patron" />
        </TabPane>
        <TabPane tab="librarians" key="3">
          <Users
            role="librarian"/>
        </TabPane>
        <TabPane tab="Admins" key="4">
          <Users
          role="Admin"/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
