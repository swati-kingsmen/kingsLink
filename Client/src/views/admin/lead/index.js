import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HasAccess } from "../../../redux/accessUtils";
import {
  Grid,
  GridItem,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Select,
  Tooltip,
  Box,
  Flex,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  ViewIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { CiMenuKebab } from "react-icons/ci";
import { getApi } from "services/api";
import CommonCheckTable from "../../../components/checkTable/checktable";
import Add from "./Add";
import Edit from "./Edit";
import AddEmailHistory from "views/admin/emailHistory/components/AddEmail";
import AddPhoneCall from "views/admin/phoneCall/components/AddPhoneCall";
import ImportModal from "./components/ImportModal";
import { putApi } from "services/api";
import CommonDeleteModel from "components/commonDeleteModel";
import { deleteManyApi } from "services/api";
import {
  getSearchData,
  setGetTagValues,
} from "../../../redux/advanceSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadData } from "../../../redux/leadSlice";
import { fetchLeadCustomFiled } from "../../../redux/leadCustomFiledSlice";
import { toast } from "react-toastify";

const Index = () => {
  const title = "Leads";
  const size = "lg";
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [permission, emailAccess, callAccess] = HasAccess([
    "Leads",
    "Emails",
    "Calls",
  ]);
  const [isLoding, setIsLoding] = useState(false);
  const [searchDisplay, setSearchDisplay] = useState(false);
  // const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [action, setAction] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [leadData, setLeadData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [deleteModel, setDelete] = useState(false);
  const [addPhoneCall, setAddPhoneCall] = useState(false);
  const [callSelectedId, setCallSelectedId] = useState();
  const [addEmailHistory, setAddEmailHistory] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedValues, setSelectedValues] = useState([]);
  const [isImport, setIsImport] = useState(false);
  const [emailRec, setEmailRec] = useState("");
  const [phoneRec, setPhoneRec] = useState({});
  const [filter, setFilter] = useState("all");
  const sampData = useSelector((state) =>
    Array.isArray(state?.leadData?.data) ? state?.leadData?.data : []
  );

  // const sampData = useSelector((state) => state?.leadData?.data);
  const data =
    filter === "all"
      ? sampData
      : sampData.filter((item) => item.leadStatus === filter);
  const hotData = sampData.filter((item) => item.leadStatus === "hot");
  const warmData = sampData.filter((item) => item.leadStatus === "warm");
  const coldData = sampData.filter((item) => item.leadStatus === "cold");
  console.log(data);

  // useEffect(()=>{
  //   const fetchFilterData=(value)=>{
  //     const warmData=data.filter((item)=>item.leadStatus===value)
  //     console.log(warmData)
  //     setData(warmData)
  // }
  // // const fetchHotData=()=>{
  // //   const hotData=data.filter((item)=>item.leadStatus==="hot");
  // //   console.log(hotData)
  // //   setData(hotData)
  // // }
  // },[data])

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const searchedDataOut = useSelector(
    (state) => state?.advanceSearchData?.searchResult
  );
  const payload = {
    leadStatus: location?.state,
  };

  const fetchData = async () => {
    setIsLoding(true);
    let result = await getApi(
      user.role === "superAdmin"
        ? "api/lead/"
        : `api/lead/?createBy=${user._id}`
    );
    // setData(result?.data);
    setIsLoding(false);
  };

  const handleOpenEmail = (id, dataLead) => {
    if (id) {
      setEmailRec(dataLead?.leadEmail);
      setAddEmailHistory(true);
    }
  };

  const setStatusData = async (cell, e) => {
    try {
      setIsLoding(true);
      let response = await putApi(
        `api/lead/changeStatus/${cell.original._id}`,
        { leadStatus: e.target.value }
      );
      if (response.status === 200) {
        setAction((pre) => !pre);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoding(false);
    }
  };

  const changeStatus = (row) => {
    // Get the 'name' value from the row
    const name = row.original.name;

    //status logic
    switch (name) {
      case "rnr":
      case "Not Interested":
      case "busy":
      case "notReachable":
      case "currentlyNotInterested":
      case "leadLost":
        return "cold"; // Return 'cold' status
      case "FollowUp":
      case "visitSchedule":
      case "visitReschedule":
      case "videoCallSchedule":
      case "videoCallReschedule":
        return "warm"; // Return 'warm' status
      case "visitedDone":
      case "bookingDone":
        return "hot"; // Return 'hot' status
      default:
        return "pending"; // Default case if no match
    }
  };

  const fetchCustomDataFields = async () => {
    setIsLoding(true);

    try {
      const result = await dispatch(fetchLeadCustomFiled());
      if (result.payload.status === 200) {
        setLeadData(result?.payload?.data);
      } else {
        toast.error("Failed to fetch data", "error");
      }

      // const actionHeader = {
      //   Header: "Action",
      //   accessor: "action",
      //   isSortable: false,
      //   center: true,
      //   cell: ({ row, i }) => (
      //     <Text fontSize="md" fontWeight="900" textAlign={"center"}>
      //       <Menu isLazy>
      //         <MenuButton>
      //           <CiMenuKebab />
      //         </MenuButton>
      //         <MenuList
      //           minW={"fit-content"}
      //           transform={"translate(1520px, 173px);"}
      //         >
      //           {permission?.update && (
      //             <MenuItem
      //               py={2.5}
      //               icon={<EditIcon fontSize={15} mb={1} />}
      //               onClick={() => {
      //                 setEdit(true);
      //                 setSelectedId(row?.values?._id);
      //               }}
      //             >
      //               Edit
      //             </MenuItem>
      //           )}
      //           {callAccess?.create && (
      //             <MenuItem
      //               py={2.5}
      //               width={"165px"}
      //               onClick={() => {
      //                 setPhoneRec(row?.original);
      //                 setAddPhoneCall(true);
      //                 setCallSelectedId(row?.values?._id);
      //               }}
      //               icon={<PhoneIcon fontSize={15} mb={1} />}
      //             >
      //               Create Call
      //             </MenuItem>
      //           )}
      //           {emailAccess?.create && (
      //             <MenuItem
      //               py={2.5}
      //               width={"165px"}
      //               onClick={() => {
      //                 handleOpenEmail(row?.values?._id, row?.original);
      //                 setSelectedId(row?.values?._id);
      //               }}
      //               icon={<EmailIcon fontSize={15} mb={1} />}
      //             >
      //               EmailSend{" "}
      //             </MenuItem>
      //           )}
      //           {permission?.view && (
      //             <MenuItem
      //               py={2.5}
      //               color={"green"}
      //               icon={<ViewIcon mb={1} fontSize={15} />}
      //               onClick={() => {
      //                 navigate(`/leadView/${row?.values?._id}`, {
      //                   state: { leadList: data },
      //                 });
      //               }}
      //             >
      //               View
      //             </MenuItem>
      //           )}
      //           {permission?.delete && (
      //             <MenuItem
      //               py={2.5}
      //               color={"red"}
      //               icon={<DeleteIcon fontSize={15} mb={1} />}
      //               onClick={() => {
      //                 setDelete(true);
      //                 setSelectedValues([row?.values?._id]);
      //               }}
      //             >
      //               Delete
      //             </MenuItem>
      //           )}
      //         </MenuList>
      //       </Menu>
      //     </Text>
      //   ),
      // };

      const actionHeader = {
        Header: "Action",
        accessor: "action",
        isSortable: false,
        center: true,
        cell: ({ row, i }) => (
          <Flex justifyContent="center" gap={2}>
            {permission?.update && (
              <Tooltip label="Edit" fontSize="sm" placement="top">
                <Box
                  as="button"
                  onClick={() => {
                    setEdit(true);
                    setSelectedId(row?.values?._id);
                  }}
                >
                  <EditIcon fontSize={20} />
                </Box>
              </Tooltip>
            )}
            {callAccess?.create && (
              <Tooltip label="Create Call" fontSize="sm" placement="top">
                <Box
                  as="button"
                  onClick={() => {
                    setPhoneRec(row?.original);
                    setAddPhoneCall(true);
                    setCallSelectedId(row?.values?._id);
                  }}
                >
                  <PhoneIcon fontSize={20} />
                </Box>
              </Tooltip>
            )}
            {emailAccess?.create && (
              <Tooltip label="Send Email" fontSize="sm" placement="top">
                <Box
                  as="button"
                  onClick={() => {
                    handleOpenEmail(row?.values?._id, row?.original);
                    setSelectedId(row?.values?._id);
                  }}
                >
                  <EmailIcon fontSize={20} />
                </Box>
              </Tooltip>
            )}
            {permission?.view && (
              <Tooltip label="View" fontSize="sm" placement="top">
                <Box
                  as="button"
                  color="green.500"
                  onClick={() => {
                    navigate(`/leadView/${row?.values?._id}`, {
                      state: { leadList: data },
                    });
                  }}
                >
                  <ViewIcon fontSize={20} />
                </Box>
              </Tooltip>
            )}
            {permission?.delete && (
              <Tooltip label="Delete" fontSize="sm" placement="top">
                <Box
                  as="button"
                  color="red.500"
                  onClick={() => {
                    setDelete(true);
                    setSelectedValues([row?.values?._id]);
                  }}
                >
                  <DeleteIcon fontSize={20} />
                </Box>
              </Tooltip>
            )}
          </Flex>
        ),
      };
      

      const tempTableColumns = [
        { Header: "#", accessor: "_id", isSortable: false, width: 10 },
        {
          Header: "Status",
          accessor: "leadStatus",
          isSortable: true,
          center: true,
          cell: ({ row }) => (
            <div className="selectOpt">
              <Select
                defaultValue={row.original.leadStatus} // Set the default value from the row's leadStatus
                className={changeStatus(row)} // Custom class based on the status
                onChange={(e) => setStatusData(row, e)} // Handle the status change
                height={7}
                width={130}
                value={row.original.leadStatus} // Set the current status value
                style={{ fontSize: "14px" }}
              >
                {/* Dynamically show options depending on the current status */}
                {changeStatus(row) !== "cold" && (
                  <option value="cold">Cold</option>
                )}
                {changeStatus(row) !== "warm" && (
                  <option value="warm">Warm</option>
                )}
                {changeStatus(row) !== "hot" && (
                  <option value="hot">Hot</option>
                )}
              </Select>
            </div>
          ),
        },
        ...(result?.payload?.data && result.payload.data.length > 0
          ? result.payload.data[0]?.fields
              ?.filter((field) => field?.isTableField === true)
              ?.map(
                (field) =>
                  field?.name !== "leadStatus" && {
                    Header: field?.label,
                    accessor: field?.name,
                  }
              ) || []
          : []),
        ...(permission?.update || permission?.view || permission?.delete
          ? [actionHeader]
          : []),
      ];

      setSelectedColumns(JSON.parse(JSON.stringify(tempTableColumns)));
      setColumns(tempTableColumns);
      setTableColumns(JSON.parse(JSON.stringify(tempTableColumns)));
      setIsLoding(false);
    } catch (error) {
      console.error("Error fetching custom data fields:", error);
      toast.error("Failed to fetch data ", "error");
    }
  };

  const handleDeleteLead = async (ids) => {
    try {
      setIsLoding(true);
      let response = await deleteManyApi("api/lead/deleteMany", ids);
      if (response.status === 200) {
        setSelectedValues([]);
        setDelete(false);
        setAction((pre) => !pre);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoding(false);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/lead") {
      dispatch(fetchLeadData());
    }
    fetchCustomDataFields();
  }, [action]);

  useEffect(() => {
    setDataColumn(
      tableColumns?.filter((item) =>
        selectedColumns?.find((colum) => colum?.Header === item.Header)
      )
    );
  }, [tableColumns, selectedColumns]);

  useEffect(() => {
    if (location?.state) {
      setSearchDisplay(true);
      dispatch(
        getSearchData({ values: payload, allData: data, type: "Leads" })
      );
      const getValue = [
        {
          name: ["leadStatus"],
          value: location?.state,
        },
      ];
      dispatch(setGetTagValues(getValue.filter((item) => item.value)));
    }
  }, [data, location?.state]);

  return (
    <div>
      <Grid templateColumns="repeat(6, 1fr)" mb={3} gap={4}>
        {!isLoding && (
          <GridItem
            colSpan={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="2xl" fontWeight="bold">
              {title}
            </Text>

            {/* Buttons Section */}

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleFilterChange("hot")}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                {`HOT (${hotData.length})`}
              </button>
              <button
                onClick={() => handleFilterChange("warm")}
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                {`WARM (${warmData.length})`}
              </button>
              <button
                onClick={() => navigate("/contacts")}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                {`COLD (${coldData.length})`}
              </button>
            </div>
          </GridItem>
        )}

        {!isLoding && (
          <GridItem colSpan={6}>
            <CommonCheckTable
              // title={title}
              isLoding={isLoding}
              searchDisplay={searchDisplay}
              setSearchDisplay={setSearchDisplay}
              columnData={columns ?? []}
              dataColumn={dataColumn ?? []}
              allData={data ?? []}
              tableData={searchDisplay ? searchedDataOut : data}
              tableCustomFields={
                leadData?.[0]?.fields?.filter(
                  (field) => field?.isTableField === true
                ) || []
              }
              access={permission}
              action={action}
              setAction={setAction}
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
              isOpen={isOpen}
              onClose={onclose}
              onOpen={onOpen}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              setDelete={setDelete}
              setIsImport={setIsImport}
            />
          </GridItem>
        )}
      </Grid>

      {isOpen && (
        <Add
          isOpen={isOpen}
          size={size}
          leadData={leadData[0]}
          onClose={onClose}
          setAction={setAction}
          action={action}
        />
      )}
      {edit && (
        <Edit
          isOpen={edit}
          size={size}
          leadData={leadData[0]}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onClose={setEdit}
          setAction={setAction}
          moduleId={leadData?.[0]?._id}
        />
      )}
      {deleteModel && (
        <CommonDeleteModel
          isOpen={deleteModel}
          onClose={() => setDelete(false)}
          type="Leads"
          handleDeleteData={handleDeleteLead}
          ids={selectedValues}
        />
      )}
      {addEmailHistory && (
        <AddEmailHistory
          fetchData={fetchData}
          isOpen={addEmailHistory}
          onClose={setAddEmailHistory}
          lead={true}
          id={selectedId}
          leadEmail={emailRec}
        />
      )}
      {addPhoneCall && (
        <AddPhoneCall
          fetchData={fetchData}
          isOpen={addPhoneCall}
          onClose={setAddPhoneCall}
          lead={true}
          id={callSelectedId}
          LData={phoneRec}
        />
      )}
      {isImport && (
        <ImportModal
          text="Lead file"
          isOpen={isImport}
          onClose={setIsImport}
          customFields={leadData?.[0]?.fields || []}
        />
      )}
    </div>
  );
};

export default Index;
