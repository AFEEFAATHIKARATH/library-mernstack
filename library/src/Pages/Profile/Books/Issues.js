import { Modal } from "antd";
import React from "react";

function Issues(open = false, setOpen, selectedBook) {
  return (
    <div>
      <Modal TITLE="Issues" open={open}
        onCancel={() => setOpen(false)}>
        <div>IssuesList</div>
      </Modal>
    </div>
  );
}

export default Issues;
