import { CloseIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Select,
} from "@chakra-ui/react";
import Spinner from "components/spinner/Spinner";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSchema } from "schema";
import { putApi, postApi, getApi } from "services/api";

const AddEditUser = (props) => {
  const {
    onClose,
    isOpen,
    setAction,
    data,
    userAction,
    userData,
    selectedId,
    fetchData,
    setUserAction,
  } = props;
  const [isLoding, setIsLoding] = useState(false);
  const [show, setShow] = React.useState(false);
  const [allEmployees, setAllEMployees] = useState([]);
  const [allManager, setAllManager] = useState([]); // Managers state
  const showPass = () => setShow(!show);

  const users = useSelector((state) => state.user.user);

  const initialValues = {
    firstName: userAction === "add" ? "" : data?.firstName,
    lastName: userAction === "add" ? "" : data?.lastName,
    username: userAction === "add" ? "" : data?.username,
    phoneNumber: userAction === "add" ? "" : data?.phoneNumber,
    password: userAction === "add" ? "" : data?.password,
    assignedManager: userAction === "add" ? "" : data?.assignedManager, // Changed field name
    designation: userAction === "add" ? "" : data?.designation, // Changed field name
    assignedEmployees: userAction === "add" ? [] : data?.assignedEmployees,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      AddData();
    },
  });
  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = formik;

  const AddData = async ({props}) => {
    if (userAction === "add") {
      try {
        setIsLoding(true);
        // console.log(values, "values");
        // POST request to register the user
        let response = await postApi("api/user/register", values);
        
        
        if (response && response.status === 200) {
          console.log(response, "response-------+++++++++----------");
          console.log("value............", values);
          // If the designation is "RM" and a manager is selected, update the assignedEmployees array
          if (values.designation === "rm" && values.assignedManager) {
            const updatedManager = await putApi(`api/user/edit/${values.assignedManager}`, {
              designation:values.designation,   
              assignedManager: values.assignedManager,
              assignedEmployees: [...values.assignedEmployees, response.data.user],
           
           
            });
            
            if (updatedManager && updatedManager.status === 200) {
              console.log(updatedManager, "updatedManager-------------------------");
              toast.success("Manager's assigned employees updated successfully.");
            } else {
              toast.error("Failed to update manager's assigned employees.");
            }
          }
          
          onClose();
          resetForm();
          props.setAction((prev) => !prev);
          setUserAction("");
        } else {
          toast.error(response.response.data?.message);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoding(false);
      }
    } else if (userAction === "edit") {
      try {
        setIsLoding(true);
        
        // PUT request to edit the user
        let response = await putApi(`api/user/edit/${selectedId}`, values);
        
        if (response && response.status === 200) {
        //   console.log(response)
        //   console.log(response.data.user._id, "response.data.user._id");

        //   console.log(values.designation, "values", values.assignedManager, "values.assignedManager", values.assignedEmployees, "values.assignedEmployees", response.data.user._id, "response.data.user._id");
          // If the designation is "RM" and a manager is selected, update the assignedEmployees array
          if (values.designation === "rm" && values.assignedManager) {
            const updatedManager = await putApi(`api/user/edit/${values.assignedManager}`, {
              assignedEmployees: [...values.assignedEmployees, response.data.user],
            });
            
            if (updatedManager && updatedManager.status === 200) {
              toast.success("Manager's assigned employees updated successfully.");
            } else {
              toast.error("Failed to update manager's assigned employees.");
            }
          }
  
          fetchData();
          onClose();
          setUserAction("");
          setAction((prev) => !prev);
        } else {
          toast.error(response.response.data?.message);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoding(false);
      }
    }
  };
  

  // Fetch all employee data and filter managers
  const fetchAllEmployeeData = async () => {
    let result = await getApi("api/user/");
    setAllEMployees(result?.data?.user);

    // Filter the employees who have the designation 'manager'
    const managers = result?.data?.user.filter(
      (employee) => employee.designation === "manager"
    );
    setAllManager(managers); // Save the managers
  };

  useEffect(() => {
    fetchAllEmployeeData();
    console.log(allEmployees, "fetch all employee data");
    console.log(allManager, "fetch all manager data");
  },[]);

    // Fetch all employee data and filter managers


    // Based On conation update assingendEmployess
    



    // Based On conation update assingendEmployess



  return (
    <Modal isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader justifyContent="space-between" display="flex">
          {userAction === "add" ? "Add" : "Edit"} User
          <IconButton onClick={onClose} icon={<CloseIcon />} />
        </ModalHeader>
        <ModalBody>
          <Grid templateColumns="repeat(12, 1fr)" gap={3}>
            <GridItem colSpan={{ base: 12 }}>
              <FormLabel>
                First Name<Text color={"red"}>*</Text>
              </FormLabel>
              <Input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                borderColor={
                  errors.firstName && touched.firstName ? "red.300" : null
                }
              />
              <Text color="red">
                {errors.firstName && touched.firstName && errors.firstName}
              </Text>
            </GridItem>

            <GridItem colSpan={{ base: 12 }}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                borderColor={
                  errors.lastName && touched.lastName ? "red.300" : null
                }
              />
              <Text color="red">
                {errors.lastName && touched.lastName && errors.lastName}
              </Text>
            </GridItem>

            <GridItem colSpan={{ base: 12 }}>
              <FormLabel>
                Email<Text color={"red"}>*</Text>
              </FormLabel>
              <Input
                type="email"
                name="username"
                placeholder="Email Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                disabled={userAction === "edit"}
                borderColor={
                  errors.username && touched.username ? "red.300" : null
                }
              />
              <Text color="red">
                {errors.username && touched.username && errors.username}
              </Text>
            </GridItem>

            <GridItem colSpan={{ base: 12 }}>
              <FormLabel>
                Phone Number<Text color={"red"}>*</Text>
              </FormLabel>
              <InputGroup>
                <InputLeftElement children={<PhoneIcon color="gray.300" />} />
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  borderColor={
                    errors.phoneNumber && touched.phoneNumber ? "red.300" : null
                  }
                />
              </InputGroup>
              <Text color="red">
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </Text>
            </GridItem>

            {userAction !== "edit" && (
              <GridItem colSpan={{ base: 12 }}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    borderColor={
                      errors.password && touched.password ? "red.300" : null
                    }
                  />
                  <InputRightElement>
                    <Icon
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={showPass}
                    />
                  </InputRightElement>
                </InputGroup>
                <Text color="red">
                  {errors.password && touched.password && errors.password}
                </Text>
              </GridItem>
            )}

            {/* <GridItem colSpan={{ base: 12 }}>
              <FormLabel>
                Designation<Text color={"red"}>*</Text>
              </FormLabel>
              <Select
                name="designation"
                value={values.designation}
                onChange={handleChange}
                onBlur={handleBlur}
                borderColor={
                  errors.designation && touched.designation ? "red.300" : null
                }
              >
                <option value="">Select Designation</option>
                <option value="manager">Manager</option>
                <option value="rm">RM</option>
              </Select>
              <Text color="red">
                {errors.designation &&
                  touched.designation &&
                  errors.designation}
              </Text>
            </GridItem>


            <GridItem colSpan={{ base: 12 }}>
              <FormLabel>
                Assigned Manager<Text color={"red"}>*</Text>
              </FormLabel>
              <Select
                name="assignedManager"
                value={values.assignedManager}
                onChange={handleChange}
                onBlur={handleBlur}
                borderColor={
                  errors.assignedManager && touched.assignedManager
                    ? "red.300"
                    : null
                }
              >
                <option value="">Select Manager</option>
                {allManager.map((manager) => (
                  <option key={manager._id} value={manager._id}>
                    {manager.firstName + " " + manager.lastName}
                  </option>
                ))}
              </Select>
              <Text color="red">
                {errors.assignedManager &&
                  touched.assignedManager &&
                  errors.assignedManager}
              </Text>
            </GridItem> */}

            <GridItem colSpan={{ base: 12 }}>
  <FormLabel>
    Designation<Text color={"red"}>*</Text>
  </FormLabel>
  <Select
    name="designation"
    value={values.designation}
    onChange={handleChange}
    onBlur={handleBlur}
    borderColor={
      errors.designation && touched.designation ? "red.300" : null
    }
  >
    <option value="">Select Designation</option>
    <option value="manager">Manager</option>
    <option value="rm">RM</option>
  </Select>
  <Text color="red">
    {errors.designation && touched.designation && errors.designation}
  </Text>
</GridItem>

{/* Conditionally render the Assigned Manager field */}
{values.designation === "rm" && (
  <GridItem colSpan={{ base: 12 }}>
    <FormLabel>
      Assigned Manager<Text color={"red"}>*</Text>
    </FormLabel>
    <Select
      name="assignedManager"
      value={values.assignedManager}
      onChange={handleChange}
      onBlur={handleBlur}
      borderColor={
        errors.assignedManager && touched.assignedManager
          ? "red.300"
          : null
      }
    >
      <option value="">Select Manager</option>
      {allManager.map((manager) => (
        <option key={manager._id} value={manager._id}>
          {manager.firstName + " " + manager.lastName}
        </option>
      ))}
    </Select>
    <Text color="red">
      {errors.assignedManager &&
        touched.assignedManager &&
        errors.assignedManager}
    </Text>
  </GridItem>
)}

            
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} isLoading={isLoding}>
            {userAction === "add" ? "Save" : "Update"}
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            ml={3}
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditUser;
