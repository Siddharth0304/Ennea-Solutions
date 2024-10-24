import React, { useState } from 'react';
import { Button, Modal, Form, InputNumber, Input} from 'antd';
import '../reviewButton.css'

const AddReviewModal = ({id,onReviewAdded}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); 
  
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        fetch(`http://localhost:8080/reviews/add/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(values), 
        })
        .then((data) => {
          console.log(values);
          onReviewAdded(id,values) //To change state to re-render with new reviews
          setOpen(false);
          setConfirmLoading(false);
          console.log('Success:', data); 
          form.resetFields();
          
        })
        .catch((error) => {
          console.error('Error:', error);
          setConfirmLoading(false); // Stop the loading in case of an error
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
        <Button  className='addRev' onClick={showModal}>
            Add Review
        </Button>
        <Modal
            title="Add New Review"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
            okButtonProps={{
                style: { 
                  backgroundColor: 'goldenrod', 
                  borderColor: 'goldenrod', 
                  color: 'black', 
                  fontWeight: 'bold'
                }
              }}
        >
            <Form
            form={form} 
            layout="vertical" 
            name="reviewForm"
            initialValues={{ remember: true }} // Set initial form values
            >
            <Form.Item
                label="Reviewer Name"
                name="reviewerName"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>

            
            <Form.Item
    label="Reviewer Email"
    name="reviewerEmail"
    rules={[
        { required: true, message: 'Please input your email!' },
        { type: 'email', message: 'Please enter a valid email address!' }
    ]}
>
    <Input style={{ width: '100%' }} placeholder="Enter your email" />
</Form.Item>

            <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true,message:'Please input the product rating!'}]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter your rating" />
            </Form.Item>

            <Form.Item
                label="Your Review"
                name="comment"
                rules={[{ required: true, message: 'Please input the product review!' }]}
            >
                <Input.TextArea placeholder="Enter your review/feedback" />
            </Form.Item>

            </Form>
        </Modal>
    </>
  );
};


export default AddReviewModal;