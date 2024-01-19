import React from "react";






function ProfileSettings() {


  return (
    <>
      <div className="container-fluid ml-[300px] mt-[21px] frame ">
        <div className="row">
          <div className="col-md-7 col-lg-8 col-xl-9">
            <div className="card">
              <div className="card-body">
                {/* <!-- Profile Settings Form --> */}
                <>
                  <div className="row form-row">
                    <div className="">
                      <div className="form-group">
                        <div className="change-avatar">
                          <div className="profile-img">
                            <img src="" alt="User Image" />
                          </div>
                          <div className="upload-img">
                            <div
                              className="change-photo-btn "
                            
                            >
                              <span>
                                <i className="fa fa-upload"></i> Upload Photo
                              </span>
                              <input type="file" className="upload"  />
                            </div>
                            <small className="form-text text-muted">
                              Allowed JPG, GIF or PNG. Max size of 2MB
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                  
                          name="FirstName"
   
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Last Name</label>
                        <input
                          type="text"
                          className="form-control"

                          name="LastName"
            
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Date of Birth</label>

                        

                    
                      
                        <input type="date" />
                      </div>

                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Blood Group</label>
                        <select className="form-control select" name="BloodGroup"
                       
                        value="">
                          <option>Select</option>
                          <option>A-</option>
                          <option>A+</option>
                          <option>B-</option>
                          <option>B+</option>
                          <option>AB-</option>
                          <option>AB+</option>
                          <option>O-</option>
                          <option>O+</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Email ID</label>
                        <input
                          type="email"
                          className="form-control"
           
                          name="Email"
                      
                        />
                      </div>
                    </div>

                  
                    <div className="col-md-6">
                    <div className="form-group flex flex-col">
                      <label className="mb-2">Phone Number</label>
                      <div className="flex relative form-control p-0 outline-none border-r-0  border-l-0 border-t-0 border-b-0 ">
                        
                          <input
                            className="form-control w-0 overflow-visible  absolute left-0"
                            id="Mobile"
                            type="text"
                          />
                        

                        <input
                          type="tel"
                          name="Mobile"
                  
                          style={ {paddingLeft : "55px"} }
                          
                          className=" absolute left-0  form-control "
                          
                        />
                      </div>
                    </div>
                  </div>



                    <div className="col-12">
                      <div className="form-group">
                        <label className="mb-2">Address</label>
                        <input
                          type="text"
                          className="form-control"
                     
                          name="Address"
                  
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">City</label>
                        <input
                          type="text"
                          className="form-control"
                  
                          name="City"
                       
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">State</label>
                        <input
                          type="text"
                          className="form-control"
                
                          name="State"
                          
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                    
                          name="ZipCode"

                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Country</label>
                        <input
                          type="text"
                          className="form-control"
            
                          name="Country"
                       
                        /> 
                      </div>
                    </div>
               
                  <div className="submit-section">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn mt-4"
                      onClick={()=>{}}
                    > 
                      Save Changes
                    </button>
                  </div>
                </>
                {/* <!-- /Profile Settings Form --> */}
              </div>
            </div>
          </div>
        </div>
      </div>


      
    </>
  );
}

export default ProfileSettings;