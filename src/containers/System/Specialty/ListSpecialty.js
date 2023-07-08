import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { getAllSpecialty, deleteSpecialty } from "../../../services/userService";
import "./ListSpecialty.scss";

class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialties: [],
    };
  }

  async componentDidMount() {
    try{
      const res = await getAllSpecialty();
      if (res && res.info.errCode === 0) {
        this.setState({
          specialties: res.info.data,
        });
      }
    }catch(err) {
      console.log(err);
    }
  }

  // async componentDidUpdate(prevProps, prevState) {
  //   if (this.state.specialties !== prevState.specialties) {
  //     const res = await getAllSpecialty();
  //     if (res && res.info.errCode === 0) {
  //       this.setState({
  //         specialties: res.info.data,
  //       });
  //     }
  //   }
  // };


  handleDelete = async(id) => {
    try{
      const res = await deleteSpecialty({id: id});
      if(res && res.info.errCode === 0) {
        toast.success("Delete specialty succeed");
      }else {
      toast.error("Wrong something");
      }
    }catch(err) {
      console.log(err);
    }
  };

  handleEdit = async(id) => {
    if(this.props.history) {
      this.props.history.push(`edit-specialty/${id}`)
    }
  };

  render() {
    const { specialties } = this.state;
    return (
      <div>
        <div className="manage-specialty">
          <div className="title">Manage Specialty</div>

          <div className="list-specialty">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {specialties &&
                  specialties.map((spe, index) => (
                    <tr key={spe.id}>
                      <td>{index + 1}</td>
                      <td>{spe.name}</td>
                      <td><button onClick={()=> this.handleEdit(spe.id)}>Edit</button><button className="btn-delete" onClick={() => this.handleDelete(spe.id)}>Delete</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
