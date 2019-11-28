import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Select } from 'dropdown-select';
import SimpleReactValidator from 'simple-react-validator';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../shared/utils/API";

class companyInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verticals: [],
      CompanyTypes: [],
      getStages: [],
      getEmployeeRanges: [],
      comapanyName: '',
      product: '',
      country: '',
      city: '',
      user: null,
      selectedVerticals: { VerticalDescription: '' },
      selectedCompanyTypes: { CompanyTypeDescription: '' },
      selectedGetStages: { StageDescription: '' },
      selectedGetEmployeeRanges: { EmployeeRangeDescription: '' },
      loader: false,
    }
    this.validator = new SimpleReactValidator({
      messages: {
        default: 'This field is Required.'
      },
    });
  }
  componentDidMount = () => {
    this.setState({ loader: true })
    this.setState({ comapanyName: JSON.parse(localStorage.user).Company.CompanyName })
    console.log(this.state.CompanyName)
    this.getVerticals();
    this.getCompanyByID();
    this.getCompanyTypes();
    this.getStages();
    this.getEmployeeRanges();
    this.setState({ loader: false })
  }

  getVerticals = async () => {
    try {
      await API.get('getVerticals').then(res => {
        console.log(res)
        this.setState({ verticals: res.data })
      })
    } catch (err) {
      toast.error(err.message)
    }
  }

  getCompanyTypes = async () => {
    try {
      await API.get('getCompanyTypes').then(res => {
        console.log(res)
        this.setState({ CompanyTypes: res.data })
      })
    } catch (err) {
      toast.error(err.message)
    }
  }

  getEmployeeRanges = async () => {
    try {
      await API.get('getEmployeeRanges').then(res => {
        console.log(res)
        this.setState({ getEmployeeRanges: res.data })
      })
    } catch (err) {
      toast.error(err.message)
    }
  }

  getStages = async () => {
    try {
      await API.get('getStages').then(res => {
        console.log(res)
        this.setState({ getStages: res.data })
      })
    } catch (err) {
      toast.error(err.message)
    }
  }

  getCompanyByID = async () => {
    try {
      let id = JSON.parse(localStorage.user).Company.CompanyID
      if (id != null) {
        await API.get(`getCompany?companyID=${id}`).then(res => {
          console.log(res)
          let VerticalDescription = { VerticalDescription: '' }
          let CompanyTypeDescription = { CompanyTypeDescription: '' }
          let StageDescription = { StageDescription: '' }
          let EmployeeRangeDescription = { EmployeeRangeDescription: '' }
          if (res.data.Vertical) {
            VerticalDescription = res.data.Vertical
          }
          if (res.data.CompanyType) {
            CompanyTypeDescription = res.data.CompanyType
          }
          if (res.data.Stage) {
            StageDescription = res.data.Stage
          }
          if (res.data.EmployeeRange) {
            EmployeeRangeDescription = res.data.EmployeeRange
          }
          this.setState({
            comapanyName: res.data.CompanyName,
            selectedVerticals: VerticalDescription,
            selectedCompanyTypes: CompanyTypeDescription,
            selectedGetStages: StageDescription,
            selectedGetEmployeeRanges: EmployeeRangeDescription,
            country: res.data.State,
            city: res.data.City,
            product: res.data.ProductName,
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  changeHandler = (stVar, val) => {
    this.setState({
      [stVar]: val
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loader: true })
    if (this.validator.allValid()) {
      let user = JSON.parse(localStorage.getItem('user'))
      let data = {
        "CompanyID": user.Company.CompanyID,
        "CompanyName": this.state.comapanyName,
        "Sitename": user.Company.SiteName,
        "ProductName": this.state.product,
        "Website": "",
        "NumberOfOffices": 0,
        "Address1": "",
        "Address2": "",
        "City": this.state.city,
        "State": this.state.country,
        "Zip": "",
        "Phone": "",
        "Facebook": "",
        "Instagram": "",
        "LinkedIn": "",
        "Tumblr": "",
        "Twitter": "",
        "Pinterest": "",
        "CompanyType": { "CompanyTypeID": this.state.selectedCompanyTypes.CompanyTypeID },
        "Vertical": { "VerticalID": this.state.selectedVerticals.VerticalID },
        "Stage": { "StageID": this.state.selectedGetStages.StageID },
        "EmployeeRange": { "EmployeeRangeID": this.state.selectedGetEmployeeRanges.EmployeeRangeID },
        "RevenueRange": { "RevenueRangeID": 0 }
      }

      console.log(data)

      try {
        await API.post('updateCompany', data).then(res => {
          console.log(res)
          if (res.data !== '') {
            //toast.success('Company Updated Successfully')
            setTimeout(() => {
              this.props.history.push('/brand')
            }, 1000);
          } else {
            toast.error('Something went Wrong, Please try Later')
          }
        })
      } catch (err) {
        toast.error(err.message)
      }

    } else {
      toast.error('All fields are Required')
      this.validator.showMessages();
      this.forceUpdate();
    }
    this.setState({ loader: false })
  }


  render() {
    return (
      <div className='p-3'>
        {
          this.state.loader ? <div className='loader_overlay'>
            <div className="custom_loader">Loading...</div>
          </div> : null
        }
        <ToastContainer />
        <div className='container'>
          <h2 className='heading bold mb-3'>Company Info</h2>
          <h4 className='mb-5'>General information an details about the company.</h4>
          <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
            <div className='form-group'>
              <input type="text" name='comapanyName' value={this.state.comapanyName} className='form-control' placeholder='Company Name (or DBA Name)' onChange={(e) => this.setState({ comapanyName: e.target.value })} />
              {/* <label className='error'>{this.validator.message('comapanyName', this.state.comapanyName, 'required')}</label> */}
            </div>
            <div className='form-group'>
              <input type="text" className='form-control' value={this.state.product} name='product' placeholder='Product Name (if different)' onChange={(e) => this.setState({ product: e.target.value })} />
              {/* <label className='error'>{this.validator.message('product', this.state.product, 'required')}</label> */}
            </div>
            <div className='form-group'>
              <Select placeholder='Vertical (Industry)' name='selectedVerticals' value={this.state.selectedVerticals} autoComplete='true' options={this.state.verticals} labelKey="VerticalDescription" valueKey="VerticalID" onChange={(val) => this.changeHandler('selectedVerticals', val)} />
              {/* <label className='error'>{this.validator.message('selectedVerticals', this.state.selectedVerticals.VerticalID, 'required')}</label> */}
            </div>
            <div className='form-group'>
              <Select placeholder='Company Type' value={this.state.selectedCompanyTypes} autoComplete='true' options={this.state.CompanyTypes} labelKey="CompanyTypeDescription" valueKey="CompanyTypeID" onChange={(val) => this.changeHandler('selectedCompanyTypes', val)} />
              {/* <label className='error'>{this.validator.message('selectedCompanyTypes', this.state.selectedCompanyTypes.CompanyTypeID, 'required')}</label> */}
            </div>
            <div className='form-group'>
              <Select placeholder='Stage' value={this.state.selectedGetStages} autoComplete='true' options={this.state.getStages} labelKey="StageDescription" valueKey="StageID" onChange={(val) => this.changeHandler('selectedGetStages', val)} />
              {/* <label className='error'>{this.validator.message('selectedGetStages', this.state.selectedGetStages.StageID, 'required')}</label> */}
            </div>
            <div className='form-group'>
              <input type="text" className='form-control' value={this.state.city} name='city' placeholder='City' onChange={(e) => this.setState({ city: e.target.value })} />
              {/* <label className='error'>{this.validator.message('city', this.state.city, 'required')}</label> */}
            </div>
            <div className='form-group'>
              <input type="text" className='form-control' value={this.state.country} name='country' placeholder='State' onChange={(e) => this.setState({ country: e.target.value })} />
              {/* <label className='error'>{this.validator.message('country', this.state.country, 'required')}</label> */}
            </div>
            <div className='form-group'>
              <Select placeholder='5-10' value={this.state.selectedGetEmployeeRanges} autoComplete='true' options={this.state.getEmployeeRanges} labelKey="EmployeeRangeDescription" valueKey="EmployeeRangeID" onChange={(val) => this.changeHandler('selectedGetEmployeeRanges', val)} />
              {/* <label className='error'>{this.validator.message('selectedGetEmployeeRanges', this.state.selectedGetEmployeeRanges.EmployeeRangeID, 'required')}</label> */}
            </div>
            <div className='mt-3 mb-5'>
              <button className='btn_green'>Save</button>
              <NavLink to='/brand' className='btn_white'>Cancel</NavLink>            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default companyInfo;
