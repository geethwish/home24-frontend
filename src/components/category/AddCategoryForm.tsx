import { Form, Input, Modal, Select } from 'antd'
import { FC } from 'react'
import { Category, CategoryFormProps } from '../../types'

interface AddCategoryFormProps {
    isOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    category?: Category | null
}
const { TextArea } = Input
const { Option } = Select;

const AddCategoryForm: FC<AddCategoryFormProps> = ({ isOpen, handleCancel, handleOk, category }) => {
    const isEdit = category !== undefined && category !== null
    const handleFormSubmit = () => {

    }

    const handleFormSubmitFailed = () => {

    }

    return (
        <Modal title={isEdit ? `Modify ${category.name}` : "Add Category"
        } open={isOpen} onOk={handleOk} onCancel={handleCancel} >
            <Form
                name="authForm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleFormSubmit}
                onFinishFailed={handleFormSubmitFailed}
                autoComplete="off"
                requiredMark={false}
            >


                <Form.Item<CategoryFormProps>
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input size='large' placeholder='johnsmith@example.com' />
                </Form.Item>

                <Form.Item<CategoryFormProps>
                    label="Category Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <TextArea size='large' placeholder='johnsmith@example.com' />
                </Form.Item>

                <Form.Item<CategoryFormProps>
                    label="Parent Category"
                    name="parent_id"

                >
                    <Select>
                        <Option value={5}>Home and Decor</Option>
                        <Option value={10}>Lighting</Option>
                        <Option value={20}>Electric</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default AddCategoryForm