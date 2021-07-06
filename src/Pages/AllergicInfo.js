import { useEffect } from "react";
import { useState, useContext } from "react";
import { loginContext, urlContext } from "../App";
import axios from "axios";
import toast from "react-hot-toast";

const AllergicInfo = () => {
  const [data, setData] = useState({
    allergy: "",
    note: "",
    userId: "",
  });

  const [allergies, setAllergies] = useState([]);

  const { state } = useContext(loginContext);
  const url = useContext(urlContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => {
      return { ...prevData, [name]: value, userId: state.user.id };
    });

    console.log(data);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    axios
      .post(url + "/api/v1/allergicinfo/", data)
      .then(() => {
        toast.success("Succesfull");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error("couldn't upload");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Your record will be deleted")) {
      axios
        .delete(url + "/api/v1/allergicinfo/" + id)
        .then(() => {
          toast.success("Delete Success");
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(url + "/api/v1/allergicinfo/");
      setAllergies(response.data.filter((d) => d.userId === state.user.id));
    };

    fetchData();
  }, [url, state]);

  return (
    <>
      <div className="content-inner">
        <div className="row my-3 py-2">
          <div className="col-sm-10  my-3 py-2">
            <p className="bold-300 col">Allergic Information</p>
          </div>
          <div className="col-sm-2  my-3 py-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add
            </button>
          </div>
        </div>
        <hr></hr>

        <div className="lab-report-upload-file-container my-3 py-2  table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Allergy</th>
                <th scope="col">Note</th>
                <th scope="col">Created on</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {allergies.map((a, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{a.allergy}</td>
                    <td>{a.note}</td>
                    <td>{a.created_on}</td>

                    <td>
                      <div className="row">
                        <div className="col">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(a.id);
                            }}
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className="modal fade "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Allergic Info
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group col">
                    <label>Allergy: </label>
                    <input
                      onChange={handleInputChange}
                      name="allergy"
                      value={data.allergy}
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group col">
                    <label>Note: </label>
                    <textarea
                      onChange={handleInputChange}
                      name="note"
                      value={data.note}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col">
                    <button type="submit" className="btn btn-primary ">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllergicInfo;
