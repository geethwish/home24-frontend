import { Button, Form, Input, Modal, Select } from 'antd'
import { FC } from 'react'
import { Category, CategoryFormProps } from '../../types'
import api from '../../services/api'
import { toast } from 'react-toastify'

interface AddCategoryFormProps {
    isOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    category?: Category | null
    categories?: Category[]
}
const { TextArea } = Input
const { Option } = Select;

const AddCategoryForm: FC<AddCategoryFormProps> = ({ isOpen, handleCancel, handleOk, category = null, categories = [] }) => {
    const [form] = Form.useForm<AddCategoryFormProps>()
    const isEdit = category !== undefined && category !== null
    const handleFormSubmit = async () => {

        if (isEdit) {

            try {
                const values = await form.validateFields();

                const response = await api.patch(`/categories/${category?.id}`, { ...values })

                console.log(response.data, 'response');

                toast.success('Category updated successfully');

                form.resetFields()

                handleOk()

            } catch (errorInfo) {
                console.log('Failed:', errorInfo);

            }
        } else {
            try {
                const values = await form.validateFields();

                const response = await api.post('/categories', { ...values })

                console.log(response.data, 'response');

                toast.success('Category added successfully');

                form.resetFields()

                handleOk()

            } catch (errorInfo) {
                console.log('Failed:', errorInfo);
            }
        }

    }

    const handleFormSubmitFailed = (errorField: unknown) => {
        console.log(errorField);

    }

    const handleOnCancel = async () => {
        await form.resetFields()
        handleCancel()
    }

    console.log(category, 'category');

    return (
        <Modal
            title={isEdit ? `Modify ${category.name}` : "Add Category"}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleOnCancel}
            footer={
                [
                    <Button key="cancel" onClick={handleOnCancel}>Cancel</Button>,
                    <Button key="submit" type='primary' onClick={handleFormSubmit}>Submit</Button>
                ]
            }
        >
            <Form
                name="authForm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                onFinishFailed={handleFormSubmitFailed}
                autoComplete="off"
                requiredMark={false}
                form={form}
                initialValues={category ? {
                    name: category.name,
                    description: category.description,
                    parent_id: category.parent_id
                } : {
                    name: '',
                    description: '',
                }}
            >

                <Form.Item<CategoryFormProps>
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <Input size='large' placeholder='Home and Decor' />
                </Form.Item>

                <Form.Item<CategoryFormProps>
                    label="Category Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input category description!' }]}
                >
                    <TextArea size='large' placeholder='E.g., A collection of modern furniture and decor items.' />
                </Form.Item>

                <Form.Item<CategoryFormProps>
                    label="Parent Category"
                    name="parent_id"
                >
                    <Select size='large' placeholder='Select Parent Category'>
                        {
                            categories.length > 0 && categories.map((category) => (
                                <Option key={category.id} value={category.id}>{category.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default AddCategoryForm