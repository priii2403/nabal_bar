// src/LoginModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ visible, setVisible }) => {
    const navigate = useNavigate()


    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = async (values) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            const token = await user.getIdToken(); // Retrieve the token here
            localStorage.setItem('authToken', token); // Store the token securely
            navigate(`/admin/${user?.uid}`)
            setVisible(false);
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <>

            <Modal
                title="Login"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <button type="submit">Log in</button>

                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default LoginModal;
