import { CloseIcon, PhoneIcon } from '@chakra-ui/icons';
import { Button, FormLabel, Grid, GridItem, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react';
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { postApi } from 'services/api';

const AddUser = (props) => {
    const { onClose, isOpen, setAction } = props;
    const [isLoding, setIsLoding] = useState(false);
    const [show, setShow] = useState(false);
    const [managers, setManagers] = useState([]);
    const [roles, setRoles] = useState([]);
    const userData = useSelector((state) => state.user.user); // Fetch user data
    const storeRoles = useSelector((state) => state.roles.roles); // Fetch roles from store

    // Validation schema with conditional validation for reportingManager
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string(),
        username: Yup.string().email('Invalid email format').required('Email is required'),
        roles: Yup.string().required('Role is required'),
        reportingManager: Yup.string().when('roles', {
            is: (role) => role === 'User',
            then: Yup.string().required('Reporting Manager is required for User role'),
            otherwise: Yup.string(),
        }),
        phoneNumber: Yup.string().required('Phone Number is required'),
        password: Yup.string().required('Password is required'),
    });

    // Initial form values
    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        roles: '',
        reportingManager: '',
        phoneNumber: '',
        password: '',
        rm: [], // Added rm field
    };

    console.log(initialValues,"initialValues.................");
    useEffect(() => {
        setRoles(storeRoles || []); // Set roles if available
        const filteredManagers = userData.filter((user) => user.roles?.includes('Manager')); // Filter users with "Manager" role
        setManagers(filteredManagers); // Set filtered managers
    }, [userData, storeRoles]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Transform the payload to include `rm` array
            const payload = {
                ...values,
                rm: values.reportingManager ? [values.reportingManager] : [],
            };
            await AddData(payload);
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = formik;

    // AddData function for user creation
    const AddData = async (data) => {
        try {
            setIsLoding(true);
            let response = await postApi('api/user/register', data);
            if (response && response.status === 200) {
                toast.success('User added successfully');
                props.onClose();
                resetForm();
                setAction((prev) => !prev);
            } else {
                toast.error(response.response?.data?.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Failed to add user');
        } finally {
            setIsLoding(false);
        }
    };

    return (
        <Modal isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader justifyContent="space-between" display="flex">
                    Add User
                    <IconButton onClick={onClose} icon={<CloseIcon />} />
                </ModalHeader>
                <ModalBody>
                    <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                        {/* First Name */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                                First Name <Text color="red">*</Text>
                            </FormLabel>
                            <Input
                                name="firstName"
                                placeholder="First Name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={errors.firstName && touched.firstName ? 'red.300' : undefined}
                            />
                            <Text color="red">{errors.firstName && touched.firstName && errors.firstName}</Text>
                        </GridItem>

                        {/* Last Name */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                                Last Name
                            </FormLabel>
                            <Input
                                name="lastName"
                                placeholder="Last Name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={errors.lastName && touched.lastName ? 'red.300' : undefined}
                            />
                            <Text color="red">{errors.lastName && touched.lastName && errors.lastName}</Text>
                        </GridItem>

                        {/* Email */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                                Email <Text color="red">*</Text>
                            </FormLabel>
                            <Input
                                name="username"
                                placeholder="Email Address"
                                type="email"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                borderColor={errors.username && touched.username ? 'red.300' : undefined}
                            />
                            <Text color="red">{errors.username && touched.username && errors.username}</Text>
                        </GridItem>
                        {/* Role */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                                Role <Text color="red">*</Text>
                            </FormLabel>
                            <Select
                                name="roles"
                                placeholder="Select Role"
                                value={values.roles}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.value === 'Manager') {
                                        setFieldValue('reportingManager', ''); // Reset reporting manager if "Manager" is selected
                                    }
                                }}
                                onBlur={handleBlur}
                                borderColor={errors.roles && touched.roles ? 'red.300' : undefined}
                            >
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </Select>
                            <Text color="red">{errors.roles && touched.roles && errors.roles}</Text>
                        </GridItem>

                        {/* Reporting Manager */}
                        {values.roles === 'User' && (
                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                                    Reporting Manager <Text color="red">*</Text>
                                </FormLabel>
                                <Select
                                    name="reportingManager"
                                    placeholder="Select Manager"
                                    value={values.reportingManager}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFieldValue('rm', e.target.value ? [e.target.value] : []); // Update `rm` dynamically
                                    }}
                                    onBlur={handleBlur}
                                    borderColor={errors.reportingManager && touched.reportingManager ? 'red.300' : undefined}
                                >
                                    {managers.map((manager) => (
                                        <option key={manager.id} value={manager.id}>
                                            {manager.firstName} {manager.lastName}
                                        </option>
                                    ))}
                                </Select>
                                <Text color="red">{errors.reportingManager && touched.reportingManager && errors.reportingManager}</Text>
                            </GridItem>
                        )}

                        {/* Phone Number */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                                Phone Number <Text color="red">*</Text>
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <PhoneIcon color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    name="phoneNumber"
                                    placeholder="Phone number"
                                    type="tel"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    borderColor={errors.phoneNumber && touched.phoneNumber ? 'red.300' : undefined}
                                />
                            </InputGroup>
                            <Text color="red">{errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}</Text>
                        </GridItem>

                        {/* Password */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    name="password"
                                    placeholder="Enter Your Password"
                                    type={show ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    borderColor={errors.password && touched.password ? 'red.300' : undefined}
                                />
                                <InputRightElement>
                                    <Icon
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={() => setShow(!show)}
                                        cursor="pointer"
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <Text color="red">{errors.password && touched.password && errors.password}</Text>
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button variant="brand" size="sm" isLoading={isLoding} onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button
                        variant="outline"
                        colorScheme="red"
                        size="sm"
                        ml={2}
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

export default AddUser;
