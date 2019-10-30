import React from 'react'
import { Select } from 'dropdown-select';
import Form from 'react-bootstrap/Form'
import './user-management.css'

class UserManagement extends React.Component {
    render = () => {
        let options = [{ label: 'Full Access', value: 'full' }, { label: 'View Access', value: 'read' }]
        return (
            <section className='pt-3 user_management px-3'>
                <div className='container'>
                    <h2 className='heading'>User Management</h2>
                    <h4 className='bold'>Add New User</h4>
                    <div>
                        <table className='mb-4'>
                            <tr>
                                <td>Email</td>
                                <td>Access</td>
                            </tr>
                            <tr>
                                <td><input type="email" className='form-control' placeholder='Aaron@patter.com' /></td>
                                <td className='no-border-left'><Select placeholder='Full Access' options={options} labelKey="label" valueKey="value" /></td>
                            </tr>
                        </table>
                        <button className='btn_green'>Send</button>
                    </div>
                    <div className='list mt-5 col-sm-10 col-xs-12 px-0 pb-5'>
                        <h4 className='bold mb-3'>User Management</h4>
                        <table className='mb-4 table'>
                            <thead>
                                <th><h4 className='bold m-0'>Email</h4></th>
                                <th><h4 className='bold m-0'>Title / Role</h4></th>
                                <th><h4 className='bold m-0'>Department</h4></th>
                                <th><h4 className='bold m-0'>Access</h4></th>
                                <th><h4 className='bold m-0'>Remove</h4></th>
                            </thead>
                            <tbody className='table-bordered'>
                                <tr>
                                    <td>Aaron@patter.com</td>
                                    <td>CEO</td>
                                    <td>Executive</td>
                                    <td><Select placeholder='Full Access' options={options} labelKey="label" valueKey="value" /></td>
                                    <td className='text-center'>
                                        <Form.Group className='mb-0' controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" custom label="" />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>parry@patter.com</td>
                                    <td>CBO</td>
                                    <td>Engineering</td>
                                    <td><Select placeholder='Full Access' options={options} labelKey="label" valueKey="value" /></td>
                                    <td className='text-center'>
                                        <Form.Group className='mb-0' controlId="formBasicCheckbox0">
                                            <Form.Check type="checkbox" custom label="" />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>theresa@patter.com</td>
                                    <td>CTO</td>
                                    <td>Operations</td>
                                    <td><Select placeholder='Full Access' options={options} labelKey="label" valueKey="value" /></td>
                                    <td className='text-center'>
                                        <Form.Group className='mb-0' controlId="formBasicCheckbox1">
                                            <Form.Check type="checkbox" custom label="" />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>jorge@patter.com</td>
                                    <td>COO</td>
                                    <td>Brand Development</td>
                                    <td><Select placeholder='Full Access' options={options} labelKey="label" valueKey="value" /></td>
                                    <td className='text-center'>
                                        <Form.Group className='mb-0' controlId="formBasicCheckbox2">
                                            <Form.Check type="checkbox" custom label="" />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>german@patter.com</td>
                                    <td>Director, Customer Success</td>
                                    <td>Operations</td>
                                    <td><Select placeholder='Full Access' options={options} labelKey="label" valueKey="value" /></td>
                                    <td className='text-center'>
                                        <Form.Group className='mb-0' controlId="formBasicCheckbox3">
                                            <Form.Check type="checkbox" custom label="" />
                                        </Form.Group>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='btn_green'>Send</button>
                        <button className='btn_white'>Cancel</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default UserManagement;