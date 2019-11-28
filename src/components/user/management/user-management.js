import React from 'react'
import { Select } from 'dropdown-select';
import Form from 'react-bootstrap/Form'
import SimpleReactValidator from 'simple-react-validator';
import './user-management.css'
import API from "../../../shared/utils/API";


class UserManagement extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            usersList: null,
            access: '',
            selected: { label: 'Full Access', value: 1 }
        }

        this.validator = new SimpleReactValidator({
            messages: {
                default: 'This field is Required.',
                email: 'Please Enter a Valid Email'
            },
        });

    }

    componentDidMount = () => {
        this.getUsers();
    }

    getUsers = () => {
        let company = JSON.parse(localStorage.user).Company
        API.get(`getUsersByCompany?companyID=${company.CompanyID}`).then(res => {
            this.setState({ usersList: res.data })
        })
    }

    changeHandler = (e, i) => {
        let list = this.state.usersList;
        list[i].IsActive = e.target.checked
        this.setState({
            usersList: list
        })

    }
    
    dropChangeHandler = (val, i) => {
        let list = this.state.usersList;
        list[i].AccessType = val
        this.setState({
            usersList: list
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            try {
                let company = JSON.parse(localStorage.user).Company
                let data = {
                    'Email': this.state.email,
                    'InviteStatus': 'Invited',
                    'AccessType': {
                        'AccessTypeID': this.state.selected.value
                    },
                    'Company': {
                        'CompanyID': company.CompanyID
                    }
                }
                API.post('insertUser', data).then(res => {
                    if (res.data.Result === 1) {
                        this.getUsers();
                        this.setState({
                            email: '',
                            selected: { label: 'Full Access', value: 1 }
                        })
                    }

                })
            } catch (error) {
                console.log(error)
            }

        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }

    handleUserSubmit = async (e) => {
        e.preventDefault();
        let users=this.state.usersList
        for(let i=0;i<users.length;i++){
            await API.post('updateUser', users[i]).then(rest => {
                if (rest.data.Result === 1) {
                    console.log(`User updated`)
                }
            })
        }
    }


    render = () => {
        let options = [{ label: 'Full Access', value: 1 }, { label: 'View Access', value: 2 }]
        let option = [{ AccessTypeName: 'Full Access', AccessTypeID: 1 }, { AccessTypeName: 'View Access', AccessTypeID: 2 }]
        return (
            <section className='pt-3 user_management px-3'>
                <div className='container'>
                    <h2 className='heading'>User Management</h2>
                    <h4 className='bold'>Add New User</h4>
                    <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
                        <table className='mb-4'>
                            <tr>
                                <td>Email</td>
                                <td>Access</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="email" name='email' value={this.state.value} className='form-control' placeholder='Email' onChange={(e) => this.setState({ email: e.target.value })} />
                                    <label className='error'>{this.validator.message('email', this.state.email, 'required|email')}</label>
                                </td>
                                <td className='no-border-left'><Select placeholder='Full Access' value={this.state.selected} options={options} labelKey="label" valueKey="value" onChange={(val) => this.setState({ selected: val })} /></td>
                            </tr>
                        </table>
                        <button type='submit' className='btn_green'>Send</button>
                    </form>
                    <form className='list mt-5 col-sm-10 col-xs-12 px-0 pb-5' onSubmit={($event) => this.handleUserSubmit($event)} noValidate>
                        <h4 className='bold mb-3'>User Management</h4>
                        <table className='mb-4 table'>
                            <thead>
                                <th><h4 className='bold m-0'>Email</h4></th>
                                <th><h4 className='bold m-0'>Title / Role</h4></th>
                                <th><h4 className='bold m-0'>Department</h4></th>
                                <th><h4 className='bold m-0'>Access</h4></th>
                                <th><h4 className='bold m-0'>Remove</h4></th>
                            </thead>
                            {this.state.usersList !== null ? <tbody className='table-bordered'>
                                {
                                    this.state.usersList.map((user, index) => {
                                        return (<tr key={index} className={user.IsActive ? null : 'Disabled'}>
                                            <td>{user.Email}</td>
                                            <td>
                                                {user.Title === '' || user.Title === null ? 'Title' : user.Title}
                                            </td>
                                            <td>
                                                {user.Department === null ? "Department" : user.Department}
                                            </td>
                                            <td>{
                                                user.AccessType !== null ? <Select placeholder='Full Access' value={user.AccessType} options={option} labelKey="AccessTypeName" valueKey="AccessTypeID" onChange={(e)=>this.dropChangeHandler(e,index)} /> : <Select placeholder='Full Access' options={option} labelKey="AccessTypeName" valueKey="AccessTypeID" onChange={(e)=>this.dropChangeHandler(e,index)} />
                                            }
                                            </td>
                                            <td className='text-center'>
                                                <Form.Group className='mb-0' controlId={`check${index}`}>
                                                    <Form.Check type="checkbox" checked={user.IsActive} custom label="" onChange={(e) => this.changeHandler(e, index)} />
                                                </Form.Group>
                                            </td>
                                        </tr>)
                                    })
                                }
                            </tbody> : null}
                        </table>
                        <button className='btn_green'>Save</button>
                        <button className='btn_white'>Cancel</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default UserManagement;