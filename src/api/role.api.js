import api from "./axios";

export const getAdminDashboard = async () => {
  const res = await api.get("/admin");
  return res.data;
};

export const getSuperAdminDashboard = async () => {
  const res = await api.get("/super_admin");
  return res.data;
};

export const getClientDashboard = async () => {
  const res = await api.get("/client");
  return res.data;
};
export const getStaffDashboard = async () => {
  const res = await api.get("/staff");
  return res.data;
};
export const postStaffOrgDetails = async (orgLeadDetails) => {
  const res = await api.post("/staff/sales/orgdetails", orgLeadDetails);
  return res.data;

}
export const getDetails = async (payload) => {
  const res = await api.get("staff/sales/getdetails", {
    params: payload
  });
  console.log('from api hub', res.data)
  return res.data;
}
export const Post_message_call_schedule = async ({ payload, parms }) => {
  console.log("parms", parms?.Stage1)
  const { MainID, DetailsID, Stage1 } = parms;
  const res = await api.patch(`/staff/sales/add_mcsc/${MainID}/${DetailsID}/${Stage1}`, payload);
  return res.data;
};
export const Post_schedule_only = async ({ payload, parms }) => {
  console.log("parms", payload)
  const { MainID, DetailsID, Stage1 } = parms;
  const res = await api.patch(`/staff/sales/add_scheduleonly/${MainID}/${DetailsID}/${Stage1}`, payload);
  return res.data;
};


export const Get_schedule_only = async ({ parms }) => {
  const { MainID, DetailsID, Stage1 } = parms;
  console.log("Parms from ", parms)
  const res = await api.get(`/staff/sales/get_scheduleonly/${MainID}/${DetailsID}/${Stage1}`
  );
  console.log('Response from api', res.data)
  return res.data;
};
export const Get_Org_Details_Only = async ({ parms }) => {
  const { _id } = parms;
  // console.log("Parms from ", parms)
  const res = await api.get(`/staff/sales/orgdetails?_id=${_id}`
  );
  // console.log('Response from api', res.data)
  return res.data;
};

export const updateOnlyOrgDetails = async ({ parms, payload }) => {
  const {_id,organizationId}=parms
  console.log("payload from base : ", payload)

  const res = await api.patch(`/staff/sales/update_org_details_only/${_id}/${organizationId}`, payload);
  console.log('Response update_org_details_only', res.data)
  return res.data;
}

