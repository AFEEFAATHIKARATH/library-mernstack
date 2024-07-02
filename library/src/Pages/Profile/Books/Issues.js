import { Modal ,message} from "antd";
import React, { useEffect } from "react";
import { HideLoading, ShowLoading } from "../../../Redux/loadersSlice";
import { GetIssues } from "../../../services/issues";
import { useDispatch } from "react-redux";


function Issues({open = false, setOpen, selectedBook}) {
  const[issues,setIssues]=React.useState([])
   const dispatch = useDispatch();
  const getIssues = async () => {
     try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        book: selectedBook._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);
  
  return (
    <div>
      <Modal title="Issues" open={open}
        onCancel={() =>
          setOpen(false)}
        footer={null}
      width={1000}>
        <div>IssuesList</div>
      </Modal>
    </div>
  );
}

export default Issues;
