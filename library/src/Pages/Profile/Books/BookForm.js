import {   Col, Form, Modal, Row, message } from 'antd'
import React from 'react'
import Button from "../../../Components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../Redux/loadersSlice';
import { AddBook } from '../../../services/books';



function BookForm({ open, setOpen, }) {
    const {user}=useSelector(state=>state.users)
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading())
            values.createdBy = user._id;
            values.availableCopies = values.totalCopies;
            const response = await AddBook(values);
            if (response.success) {
                message.success(response.message);

            }
            else {
                message.error(response.message);
            }
            dispatch(HideLoading)
        }
        catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
             
        }
    }
return (
      <Modal
        title="Add Book"
        open={open}
        onCancel={() => setOpen(false)}
        centered
        width={800}
        footer={null}
      >
        <Form layout="vertical"
          onFinish={onFinish}>
          <Row gutter={[20]}>
            <Col span={24}>
              <Form.Item
                label="title"
                name="title"
                rules={[{ required: true, message: "Please input book title" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input book description" },
                ]}
              >
                <textarea type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Image URL"
                name="image"
                rules={[{ required: true, message: "Please input image url" }]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Author"
                name="author"
                rules={[
                  { required: true, message: "Please input author name" },
                ]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Publisher"
                name="publisher"
                rules={[
                  { required: true, message: "Please input publisher name" },
                ]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Published Date"
                name="publishedDate"
                rules={[
                  { required: true, message: "Please input published date" },
                ]}
              >
                <input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please input category" }]}
              >
                <select>
                  <option value="">Select Category</option>
                  <option value="mythology">Mythology</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="biography">Biography</option>
                  <option value="poetry">Poetry</option>
                  <option value="drama">Drama</option>
                  <option value="history">History</option>
                </select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Rent Per Day"
                name="rentPerDay"
                rules={[
                  { required: true, message: "Please input rent per day" },
                ]}
              >
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Total Copies"
                name="totalCopies"
                rules={[
                  { required: true, message: "Please input total copies" },
                ]}
              >
                <input type="text" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-2 mt-1">
            <Button
              type="button"
              variant="outlined"
              title="Cancel"
              onClick={() => setOpen(false)}
            />
            <Button title="Save" type="submit" />
          </div>
        </Form>
      </Modal>
    );
}

export default BookForm
