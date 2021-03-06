import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Select } from 'dropdown-select';
import { GoLightBulb } from "react-icons/go";
import Popup from '../../../shared/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import API from "../../../shared/utils/API";

class foundation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show1: false,
      show2: false,
      show3: false,
      options: [],
      val1: '',
      val2: '',
      val3: '',
      val4: '',
      val5: '',

      organizationalData: null,
      CompanyOrganizationalValueIDs: [],

      elevatorData: null,
      elevatorDescDepartmentID: 0,
      elevatorDesc: '',

      missionData: null,
      missionDescDepartmentID: 0,
      missionDesc: '',

      originData: null,
      originDescDepartmentID: 0,
      originDesc: '',

      loader: false,

      title: '',
      title1: '',
      title2: '',
      title3: '',
      desc: '',
      desc1: '',
      desc2: '',
      desc3: '',
      Importance: '',
      Importance1: '',
      Importance2: '',
      Importance3: '',
      Hint: '',
      Hint1: '',
      Hint2: '',
      Hint3: '',

    }
  }

  componentDidMount = async () => {
    this.setState({ loader: true })
    await this.getInitialData()
    this.setState({ loader: false })
  }

  getInitialData = async () => {
    try {
      // Elevator
      await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=1`).then(res => {
        console.log(res)
        this.setState({
          elevatorData: res.data,
          elevatorDesc: res.data.Value,
          title2: res.data.BrandElement.BrandElementName,
          desc2: res.data.BrandElement.BrandElementDescription,
          Importance2: res.data.BrandElement.Importance,
          Hint2: res.data.BrandElement.Hint,
        })
        if (res.data.Department != undefined) {
          this.setState({ elevatorDescDepartmentID: res.data.Department.DepartmentID })
        }
      })

      // Origin
      await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=4`).then(res => {
        console.log(res)
        this.setState({
          originData: res.data,
          originDesc: res.data.Value,
          title1: res.data.BrandElement.BrandElementName,
          desc1: res.data.BrandElement.BrandElementDescription,
          Importance1: res.data.BrandElement.Importance,
          Hint1: res.data.BrandElement.Hint,
        })
        if (res.data.Department != undefined) {
          this.setState({ originDescDepartmentID: res.data.Department.DepartmentID })
        }
      })

      // Mission
      await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=2`).then(res => {
        console.log(res)
        this.setState({
          missionData: res.data,
          missionDesc: res.data.Value,
          title: res.data.BrandElement.BrandElementName,
          desc: res.data.BrandElement.BrandElementDescription,
          Importance: res.data.BrandElement.Importance,
          Hint: res.data.BrandElement.Hint,
        })
        if (res.data.Department != undefined) {
          this.setState({ missionDescDepartmentID: res.data.Department.DepartmentID })
        }
      })

      // getValues
      await API.get(`getValues`).then(res => {
        console.log(res)
        this.setState({
          options: res.data,
        })
      })

      // Organizational
      await API.get(`getCompanyBrandElement?companyID=${JSON.parse(localStorage.user).Company.CompanyID}&BrandElementID=3`).then(res => {
        console.log(res)
        res.data.CompanyBrandElementValues.forEach((v, i) => {
          let vars = `val${i + 1}`
          this.setState({ [vars]: v.Value, CompanyOrganizationalValueIDs: [...this.state.CompanyOrganizationalValueIDs, v.CompanyBrandElementValuesID] })
        })
        this.setState({
          organizationalData: res.data,
          title3: res.data.BrandElement.BrandElementName,
          desc3: res.data.BrandElement.BrandElementDescription,
          Importance3: res.data.BrandElement.BrandElementName,
          Hint3: res.data.BrandElement.BrandElementDescription,
        })
      })



    } catch (err) {
      toast.error(err.message)
    }
  }

  handleClose = () => {
    this.setState({
      show: false,
      show1: false,
      show2: false,
      show3: false,
    })
  };
  handleShow = (key) => {
    this.setState({
      [key]: true,
    })
  };

  changeHandler = (stVar, val) => {
    this.setState({
      [stVar]: val
    })
  }

  cancleHandler = async () => {
    await this.getInitialData()
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loader: true })
    let CompanyBrandElementID = 0
    let BrandElementID = 0
    if (this.state.elevatorData.CompanyBrandElementID) {
      CompanyBrandElementID = this.state.elevatorData.CompanyBrandElementID
    }
    if (this.state.elevatorData.BrandElementID) {
      BrandElementID = this.state.elevatorData.BrandElementID
    }
    let elevatorData = {
      "CompanyBrandElementID": CompanyBrandElementID,
      "BrandElement": {
        "BrandElementID": BrandElementID
      },
      "Department": { "DepartmentID": this.state.elevatorDescDepartmentID },
      "User": { "UserID": JSON.parse(localStorage.user).UserID },
      "Value": this.state.elevatorDesc
    }
    console.log(elevatorData)

    let originData = {
      "CompanyBrandElementID": this.state.originData.CompanyBrandElementID,
      "BrandElement": {
        "BrandElementID": this.state.originData.BrandElement.BrandElementID
      },
      "Department": { "DepartmentID": this.state.originDescDepartmentID },
      "User": { "UserID": JSON.parse(localStorage.user).UserID },
      "Value": this.state.originDesc
    }
    console.log(originData)

    let missionData = {
      "CompanyBrandElementID": this.state.missionData.CompanyBrandElementID,
      "BrandElement": {
        "BrandElementID": this.state.missionData.BrandElement.BrandElementID
      },
      "Department": { "DepartmentID": this.state.missionDescDepartmentID },
      "User": { "UserID": JSON.parse(localStorage.user).UserID },
      "Value": this.state.missionDesc
    }
    console.log(missionData)

    let origanizationalData = [
      { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[0], "ValuesID": this.state.val1.ValuesID },
      { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[1], "ValuesID": this.state.val2.ValuesID },
      { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[2], "ValuesID": this.state.val3.ValuesID },
      { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[3], "ValuesID": this.state.val4.ValuesID },
      { "CompanyOrganizationalValueID": this.state.CompanyOrganizationalValueIDs[4], "ValuesID": this.state.val5.ValuesID }
    ]

    console.log(origanizationalData)

    try {

      // Elevator
      let ElevatorRes = await API.post(`updateCompanyBrandElement`, elevatorData).then(res => {
        console.log(res)
        if (res.data.Result == 1) {
          return true
        } else {
          return false
        }
      })

      // Origin
      let OriginRes = await API.post(`updateCompanyBrandElement`, originData).then(res => {
        console.log(res)
        if (res.data.Result == 1) {
          return true
        } else {
          return false
        }
      })

      // Mission
      let MissionRes = await API.post(`updateCompanyBrandElement`, missionData).then(res => {
        console.log(res)
        if (res.data.Result == 1) {
          return true
        } else {
          return false
        }
      })

      // Origanizational
      let OriganizationalRes = await API.post(`updateOrganizationalValues`, origanizationalData).then(res => {
        console.log(res)
        if (res.data.Result == 1) {
          return true
        } else {
          return false
        }
      })

      if (ElevatorRes && OriginRes && MissionRes && OriganizationalRes) {
        //toast.success('Updated Successfully')
        // setTimeout(() => {
        //   this.props.history.push('/brand')
        // }, 1000);
      } else {
        toast.error('Something went Wrong!')
      }


    } catch (err) {
      toast.error(err.message)
    }
    this.setState({ loader: false })
  }

  render() {
    const { show, show1, show2, show3 } = this.state;
    return (
      <div className='p-3'>
        {
          this.state.loader ? <div className='loader_overlay'>
            <div className="custom_loader">Loading...</div>
          </div> : null
        }
        <ToastContainer />
        <div className='container'>
          <h2 className='heading bold mb-3'>Our Foundation</h2>
          <h4 className='mb-5'>These are the brand elements in which the entire organization is built upon.</h4>
          <form className='form' onSubmit={($event) => this.handleSubmit($event)} noValidate>
            <div className='form-group'>
              <label className='label'>Mission/ Purpose</label>
              <textarea className='form-control textarea' placeholder='Your Mission/ Purpose' value={this.state.missionDesc} onChange={($event) => this.setState({ missionDesc: $event.target.value })} ></textarea>
              <span className='textarea_tooltip mt-4 pt-2' onClick={() => this.handleShow('show')} ><GoLightBulb /></span>
            </div>
            <div className='form-group'>
              <label className='label'>Origin Story</label>
              <textarea className='form-control textarea' placeholder='Your Origin Story' value={this.state.originDesc} onChange={($event) => this.setState({ originDesc: $event.target.value })} ></textarea>
              <span className='textarea_tooltip mt-4 pt-2' onClick={() => this.handleShow('show1')} ><GoLightBulb /></span>
            </div>
            <div className='form-group'>
              <label className='label'>Elevator Pitch</label>
              <textarea className='form-control textarea' placeholder='Your Elevator Pitch' value={this.state.elevatorDesc} onChange={($event) => this.setState({ elevatorDesc: $event.target.value })} ></textarea>
              <span className='textarea_tooltip mt-4 pt-2' onClick={() => this.handleShow('show2')} ><GoLightBulb /></span>
            </div>
            <div className='form-group'>
              <label className='label'>Organizational Values</label>
              <Select placeholder='Humility' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val1} onChange={(val) => this.changeHandler('val1', val)} />
              <span className='textarea_tooltip mt-4 pt-2' onClick={() => this.handleShow('show3')} ><GoLightBulb /></span>
            </div>
            <div className='form-group'>
              <Select placeholder='Empathy' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val2} onChange={(val) => this.changeHandler('val2', val)} />
            </div>
            <div className='form-group'>
              <Select placeholder='Collaboration' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val3} onChange={(val) => this.changeHandler('val3', val)} />
            </div>
            <div className='form-group'>
              <Select placeholder='Persistence' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val4} onChange={(val) => this.changeHandler('val4', val)} />
            </div>
            <div className='form-group'>
              <Select placeholder='Speed' labelKey="ValuesName" valueKey="ValuesID" options={this.state.options} value={this.state.val5} onChange={(val) => this.changeHandler('val5', val)} />
            </div>
            <div className='mt-3 mb-5'>
              <button className='btn_green' type='submit'>Save</button>
              <span onClick={this.cancleHandler} className='btn_white pointer'>Cancel</span>            </div>
          </form>
        </div>
        <Popup show={show} Hint={this.state.Hint} Importance={this.state.Importance} title={this.state.title} desc={this.state.desc} hide={this.handleClose} />
        <Popup show={show1} Hint={this.state.Hint1} Importance={this.state.Importance1} title={this.state.title1} desc={this.state.desc1} hide={this.handleClose} />
        <Popup show={show2} Hint={this.state.Hint2} Importance={this.state.Importance2} title={this.state.title2} desc={this.state.desc2} hide={this.handleClose} />
        <Popup show={show3} Hint={this.state.Hint3} Importance={this.state.Importance3} title={this.state.title3} desc={this.state.desc3} hide={this.handleClose} />
      </div>
    );
  }
}

export default foundation;
