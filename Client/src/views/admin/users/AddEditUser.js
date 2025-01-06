import { CloseIcon, PhoneIcon } from '@chakra-ui/icons';
import { Button, FormLabel, Grid, GridItem, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react';
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { userSchema } from 'schema';
import { putApi, postApi } from 'services/api';

const AddEditUser = (props) => {
    const {
        onClose,
        isOpen,
        setAction,
        data,
        userAction,
        userData = [], // Ensure userData has a default value
        selectedId,
        fetchData,
        setUserAction,
    } = props;

    const [isLoding, setIsLoding] = useState(false);
    const [show, setShow] = React.useState(false);
    const [roles, setRoles] = useState([]);
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted
        // Fetch roles and reporting managers
        setRoles(['Admin', 'Manager', 'User']); // Replace with dynamic data if necessary

        if (isMounted && userData?.length > 0) {
            const filteredManagers = userData.filter((user) => user.roles?.includes('Manager'));
            setManagers(filteredManagers);
        }

        return () => {
            isMounted = false; // Cleanup to prevent memory leaks
        };
    }, [userData]);

    const initialValues = {
        firstName: userAction === "add" ? '' : data?.firstName,
        lastName: userAction === "add" ? '' : data?.lastName,
        username: userAction === "add" ? '' : data?.username,
        phoneNumber: userAction === "add" ? '' : data?.phoneNumber,
        password: userAction === "add" ? '' : data?.password,
        roles: userAction === "add" ? '' : data?.roles || '',
        reportingManager: userAction === "add" ? '' : data?.reportingManager || '',
        rm: userAction === "add" ? [] : data?.rm || [],
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            AddData(values);
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = formik;

    const AddData = async (values) => {
        const payload = {
            ...values,
            rm: values.reportingManager ? [values.reportingManager] : [],
        };

        try {
            setIsLoding(true);
            let response;

            if (userAction === "add") {
                response = await postApi('api/user/register', payload);
            } else if (userAction === "edit") {
                response = await putApi(`api/user/edit/${selectedId}`, payload);
            }

            if (response && response.status === 200) {
                toast.success(`${userAction === "add" ? 'User added' : 'User updated'} successfully`);
                fetchData();
                onClose();
                setAction((prev) => !prev);
                setUserAction('');
                resetForm();
            } else {
                toast.error(response.response?.data?.message || 'An error occurred');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to save user data');
        } finally {
            setIsLoding(false);
        }
    };

    const showPass = () => setShow(!show);

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
                        {/* First Name */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel>
                                First Name <Text color="red">*</Text>
                            </FormLabel>
                            <Input
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="First Name"
                                borderColor={errors.firstName && touched.firstName ? 'red.300' : undefined}
                            />
                            <Text color="red">{errors.firstName && touched.firstName && errors.firstName}</Text>
                        </GridItem>

                        {/* Last Name */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Last Name"
                                borderColor={errors.lastName && touched.lastName ? 'red.300' : undefined}
                            />
                            <Text color="red">{errors.lastName && touched.lastName && errors.lastName}</Text>
                        </GridItem>

                        {/* Email */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel>
                                Email <Text color="red">*</Text>
                            </FormLabel>
                            <Input
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={userAction === 'edit'}
                                placeholder="Email"
                                borderColor={errors.username && touched.username ? 'red.300' : undefined}
                            />
                            <Text color="red">{errors.username && touched.username && errors.username}</Text>
                        </GridItem>

                        {/* Roles */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel>
                                Role <Text color="red">*</Text>
                            </FormLabel>
                            <Select
                                name="roles"
                                value={values.roles}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.value !== 'User') {
                                        setFieldValue('reportingManager', '');
                                        setFieldValue('rm', []);
                                    }
                                }}
                                onBlur={handleBlur}
                                placeholder="Select Role"
                                borderColor={errors.roles && touched.roles ? 'red.300' : undefined}
                            >
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </Select>
                            <Text color="red">{errors.roles && touched.roles && errors.roles}</Text>
                        </GridItem>

                        {/* Reporting Manager */}
                        {values.roles === 'User' && (
                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel>
                                    Reporting Manager <Text color="red">*</Text>
                                </FormLabel>
                                <Select
                                    name="reportingManager"
                                    value={values.reportingManager}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFieldValue('rm', e.target.value ? [e.target.value] : []);
                                    }}
                                    onBlur={handleBlur}
                                    placeholder="Select Reporting Manager"
                                    borderColor={
                                        errors.reportingManager && touched.reportingManager
                                            ? 'red.300'
                                            : undefined
                                    }
                                >
                                    {managers.map((manager) => (
                                        <option key={manager.id} value={manager.id}>
                                            {manager.firstName} {manager.lastName}
                                        </option>
                                    ))}
                                </Select>
                                <Text color="red">
                                    {errors.reportingManager && touched.reportingManager && errors.reportingManager}
                                </Text>
                            </GridItem>
                        )}

                        {/* Phone Number */}
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel>
                                Phone Number <Text color="red">*</Text>
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <PhoneIcon color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Phone Number"
                                    borderColor={
                                        errors.phoneNumber && touched.phoneNumber ? 'red.300' : undefined
                                    }
                                />
                            </InputGroup>
                            <Text color="red">{errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}</Text>
                        </GridItem>

                        {/* Password */}
                        {userAction === 'add' && (
                            <GridItem colSpan={{ base: 12 }}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type={show ? 'text' : 'password'}
                                        placeholder="Password"
                                        borderColor={
                                            errors.password && touched.password ? 'red.300' : undefined
                                        }
                                    />
                                    <InputRightElement>
                                        <Icon
                                            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                            onClick={showPass}
                                            cursor="pointer"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <Text color="red">{errors.password && touched.password && errors.password}</Text>
                            </GridItem>
                        )}
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="brand"
                        isLoading={isLoding}
                        onClick={handleSubmit}
                        size="sm"
                    >
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

export default AddEditUser;
