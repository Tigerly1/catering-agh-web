import React from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';

const { Option } = Select;

const initialValues = {
    name: "Kotlet schabowy z ziemniakami",
    type: "Kuchnia Polska",
    typeOfFood: ["Mięsny", "Danie Główne"],
    ingredients: ["ziemniaki", "kotlet schabowy", "surówki"],
    maxDishes: 40,
    price: 13,
    description: "Kotlet Schabowy z ziemniakami domowej roboty i kapustą.",
    image: 'https://www.shutterstock.com/image-photo/pork-breaded-cutlet-coated-breadcrumbs-260nw-2177984799.jpg',
    images: ['https://www.shutterstock.com/image-photo/pork-breaded-cutlet-coated-breadcrumbs-260nw-2123780906.jpg', 'https://www.shutterstock.com/image-photo/pork-breaded-cutlet-coated-breadcrumbs-260nw-2170566851.jpg', 'https://www.shutterstock.com/image-photo/polish-breaded-pork-cutlets-kotlet-260nw-2014937078.jpg', 'https://www.shutterstock.com/image-photo/pork-breaded-cutlet-coated-breadcrumbs-260nw-2120051099.jpg', 'https://www.shutterstock.com/image-photo/pork-breaded-cutlet-coated-breadcrumbs-260nw-2118925628.jpg', 'https://www.shutterstock.com/image-photo/kotlet-schabowy-polish-breaded-pork-260nw-2013712103.jpg', 'https://www.shutterstock.com/image-photo/kotlet-schabowy-polish-pork-schnitzel-260nw-2015515721.jpg', 'https://www.shutterstock.com/image-photo/fried-pork-cutlet-breaded-served-260nw-2017169204.jpg']
};

const AddDish = ({ }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            //onFinish(values);
            console.log(values)
            form.resetFields();
        });
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={initialValues}
            layout="vertical"
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input the name of the dish',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="type"
                label="Type"
                rules={[
                    {
                        required: true,
                        message: 'Please select the type of cuisine',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="typeOfFood"
                label="Type of food"
                rules={[
                    {
                        required: true,
                        message: 'Please select the type of food',
                    },
                ]}
            >
                <Select mode="multiple">
                    <Option value="Mięsny">Mięsny</Option>
                    <Option value="Danie Główne">Danie Główne</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="ingredients"
                label="Ingredients"
                rules={[
                    {
                        required: true,
                        message: 'xd'
                    }
                ]}
            >
                <Select mode="tags">
                    <Option value="ziemniaki">ziemniaki</Option>
                    <Option value="kotlet schabowy">kotlet schabowy</Option>
                    <Option value="surówki">surówki</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="maxDishes"
                label="Max dishes"
                rules={[
                    {
                        required: true,
                        message: 'Please input the maximum number of dishes',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        message: 'Please input the price of the dish',
                    },
                ]}
            >
                <InputNumber step={0.01} />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please input the description of the dish',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name="image"
                label="Image URL"
                rules={[
                    {
                        required: true,
                        message: 'Please input the URL of the dish image',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="images"
                label="Additional Images URLs"
                rules={[
                    {
                        required: true,
                        message: 'Please input the URLs of additional dish images',
                    },
                ]}
            >
                <Select mode="tags">
                    {initialValues.images.map((url, index) => (
                        <Option key={index} value={url}>{url}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Dish
                </Button>
            </Form.Item>
        </Form>
    )
}
export default AddDish
