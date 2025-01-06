import { CloseIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton } from '@chakra-ui/react';
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApi, putApi } from 'services/api';
import { generateValidationSchema } from '../../../utils';
import * as yup from 'yup'
import CustomForm from 'utils/customForm';
import { postApi } from 'services/api';

const Edit = (props) => {
    const { data } = props;
    console.log(props.contactData,".......gfdsf.............")
    const [isLoding, setIsLoding] = useState(false)
    const initialFieldValues = Object.fromEntries(
        (props?.contactData?.fields || []).map(field => [field?.name, ''])
    );
    console.log(initialFieldValues,"............initialFieldValues............")

    //     lastName: "",
    //     title: "",
    //     email: "",
    //     phoneNumber: "",
    //     mobileNumber: "",
    //     physicalAddress: "",
    //     mailingAddress: "",
    //     preferredContactMethod: "",
    //     // 2.Lead Source Information
    //     leadSource: "",
    //     referralSource: "",
    //     campaignSource: "",
    //     // 3. Status and Classifications
    //     leadStatus: "",
    //     leadRating: "",
    //     leadConversionProbability: "",
    //     // 4. Property of Interest
    //     // 5. History:
    //     notesandComments: "",
    //     // 6. Tags or Categories
    //     tagsOrLabelsForcategorizingcontacts: "",
    //     // 7. Important Dates::
    //     birthday: "",
    //     anniversary: "",
    //     keyMilestones: "",
    //     // 8. Additional Personal Information
    //     dob: "",
    //     gender: "",
    //     occupation: "",
    //     interestsOrHobbies: "",
    //     // 9. Preferred  Communication Preferences:
    //     communicationFrequency: "",
    //     preferences: "",
    //     // 10. Social Media Profiles:
    //     linkedInProfile: "",
    //     facebookProfile: "",
    //     twitterHandle: "",
    //     otherProfiles: "",
    //     // 11. Lead Assignment and Team Collaboration:
    //     agentOrTeamMember: "",
    //     internalNotesOrComments: "",
    //     createBy: JSON.parse(localStorage.getItem('user'))._id,
    // });
    const [initialValues, setInitialValues] = useState({
        ...initialFieldValues,
        createBy: JSON.parse(localStorage.getItem('user'))._id
    });
    const param = useParams()

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: yup.object().shape(generateValidationSchema(props?.contactData?.fields)),
        onSubmit: (values, { resetForm }) => {
            EditData();
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, } = formik

    // const EditData = async () => {
    //     try {
    //         setIsLoding(true)
    //         let response = await putApi(`api/form/edit/${props?.selectedId || param.id}`, { ...values, moduleId: props?.moduleId })
    //         if (response.status === 200) {
    //             props.onClose();
    //             props.setAction((pre) => !pre)
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //         setIsLoding(false)
    //     }
    // };


// first approch
    // const EditData = async () => {
    //     try {
    //         setIsLoding(true);
    
    //         // Update the contact
    //         let response = await putApi(
    //             `api/form/edit/${props?.selectedId || param.id}`,
    //             { ...values, moduleId: props?.moduleId }
    //         );
    
    //         if (response.status === 200) {
    //             console.log(response.status);
    //             // Check the contact status for conversion
    //             const selectedRemark = values?.leadRemark?.toLowerCase();
    //             console.log(".....",values); // Assuming 'status' is part of `values`
    //             const leadStatuses = ["warm", "hot"]; // Conditions for lead conversion
    

    //             if (leadStatuses.includes(selectedRemark)) {
    //                 console.log("..........................status..................", selectedRemark);
    //                 console.log("email", values?.email);
    //                 // Prepare lead data based on contact values
    //                 const leadData = {
    //                     ...values, // Spread all the contact fields
    //                     status: selectedRemark,
    //                     leadName: values?.ContactName,
    //                     leadEmail: values?.email,
    //                     leadRemark: values?.leadRemark,
    //                     leadPhoneNumber: values?.phoneNumber,
    //                     budget: 0,
    //                     type: "",
    //                     location: "",
    //                     source: "Contact Conversion", // Optional: Add any specific flag
    //                     createdBy: JSON.parse(localStorage.getItem("user"))._id, // Add user details if needed
    //                 };
    
    //                 // Post the new lead
    //                 let leadResponse = await postApi(`api/lead/add`, leadData);
    
    //                 if (leadResponse.status === 200) {
    //                     console.log("Lead added successfully from contact.");
    //                 } else {
    //                     console.error("Failed to add the lead:", leadResponse);
    //                 }
    //             }
    
    //             // Close the modal and refresh the action
    //             props.onClose();
    //             props.setAction((prev) => !prev);
    //         }
    //     } catch (error) {
    //         console.error("Error during contact edit and lead conversion:", error);
    //     } finally {
    //         setIsLoding(false);
    //     }
    // };
    
// second approch
    // const EditData = async () => {
    //     try {
    //         setIsLoding(true);
    
    //         // Update the contact
    //         let response = await putApi(
    //             `api/form/edit/${props?.selectedId || param.id}`,
    //             { ...values, moduleId: props?.moduleId }
    //         );
    
    //         if (response.status === 200) {
    //             console.log(response.status);
    //             // Get the leadRemark value from the contact data
    //             const selectedRemark = values?.leadRemark;
    
    //             console.log(".....", values); // Assuming 'leadRemark' is part of `values`
                
    //             // Define mappings for leadRemark to leadStatus
    //             const statusMappings = {
    //                 cold: ["RNR", "Not Interested", "Busy", "Not Reachable", "Currenlty Not Interested", "Lead Lost"],
    //                 warm: ["Follow Up", "Site Visit Schedule", "Site Visit Reschedule", "Video Call Schedule", "Video Call Reschedule"],
    //                 hot: ["Site Visited Done", "Booking Done"]
    //             };
    
    //             // Determine the leadStatus based on the leadRemark
    //             let leadStatus;
    //             for (const [status, remarks] of Object.entries(statusMappings)) {
    //                 if (remarks.includes(selectedRemark)) {
    //                     leadStatus = status;
    //                     break;
    //                 }
    //             }
    
    //             // Check if the leadRemark results in a valid conversion status ("warm" or "hot")
    //             const validStatusesForConversion = ["warm", "hot"];
                
    //             if (leadStatus && validStatusesForConversion.includes(leadStatus)) {
    //                 console.log("..........................status..................", leadStatus);
    //                 console.log("email", values?.email);
    
    //                 // Prepare lead data based on contact values
    //                 const leadData = {
    //                     ...values, // Spread all the contact fields
    //                     status: leadStatus, // Use the dynamically determined leadStatus
    //                     leadName: values?.ContactName,
    //                     leadEmail: values?.email,
    //                     leadPhoneNumber: values?.phoneNumber,
    //                     budget: 0,  // Optional: You can dynamically set this if needed
    //                     type: "",   // Optional: You can dynamically set this if needed
    //                     location: "", // Optional: You can dynamically set this if needed
    //                     source: "Contact Conversion", // Flag the source as "Contact Conversion"
    //                     createdBy: JSON.parse(localStorage.getItem("user"))._id, // Include user details if needed
    //                 };
    
    //                 // Post the new lead data
    //                 let leadResponse = await postApi(`api/lead/add`, leadData);
    
    //                 if (leadResponse.status === 200) {
    //                     console.log("Lead added successfully from contact.");
    //                 } else {
    //                     console.error("Failed to add the lead:", leadResponse);
    //                 }
    //             }
    
    //             // Close the modal and refresh the action
    //             props.onClose();
    //             props.setAction((prev) => !prev);
    //         }
    //     } catch (error) {
    //         console.error("Error during contact edit and lead conversion:", error);
    //     } finally {
    //         setIsLoding(false);
    //     }
    // };
    
// third approch
const EditData = async () => {
    try {
        setIsLoding(true);

        // Update the contact
        let response = await putApi(
            `api/form/edit/${props?.selectedId || param.id}`,
            { ...values, moduleId: props?.moduleId }
        );

        if (response.status === 200) {
            console.log(response.status);

            // Determine the lead status based on the leadRemark
            const selectedRemark = values?.leadRemark;
            let selectedStatus;
            console.log("selected remark...............",selectedRemark)
            switch (selectedRemark) {
                case "rnr":
                case "notInterested":
                case "busy":
                case "notReachable":
                case "Currently Not Interested":
                case "Lead Lost":
                    selectedStatus = "cold"; // Return 'cold' status
                    break;

                case "followUp":
                case "visitScheduled":
                case "visitReschedule":
                case "videoCallScheduled":
                case "videoCallReschedule":
                    selectedStatus = "warm"; // Return 'warm' status
                    break;

                case "visitedDone":
                case "bookingDone":
                    selectedStatus = "hot"; // Return 'hot' status
                    break;

                default:
                    selectedStatus = "pending"; // Default case if no match
                    break;
            }

            console.log("Selected Status: ", selectedStatus);

            // Prepare lead data based on contact values
            const leadData = {
                ...values, // Spread all the contact fields
                leadStatus: selectedStatus, // Set the determined status
                leadName: values?.ContactName,
                leadEmail: values?.email,
                leadRemark: values?.leadRemark,
                leadPhoneNumber: values?.phoneNumber,
                origin: values?.origin,
                budget: 0,
                type: "",
                location: "",
                source: "Contact Conversion", // Optional: Add any specific flag
                createdBy: JSON.parse(localStorage.getItem("user"))._id, // Add user details if needed
            };

            // Post the new lead
            let leadResponse = await postApi(`api/lead/add`, leadData);

            if (leadResponse.status === 200) {
                console.log("Lead added successfully from contact.");
            } else {
                console.error("Failed to add the lead:", leadResponse);
            }

            // Close the modal and refresh the action
            props.onClose();
            props.setAction((prev) => !prev);
        }
    } catch (error) {
        console.error("Error during contact edit and lead conversion:", error);
    } finally {
        setIsLoding(false);
    }
};


    const handleClose = () => {
        props.onClose(false)
        props.setSelectedId && props?.setSelectedId()
    }
    let response
    const fetchData = async () => {
        if (data) {
            setInitialValues((prev) => ({ ...prev, ...data }))
        } else if (props?.selectedId || param.id) {
            try {
                setIsLoding(true)
                response = await getApi('api/contact/view/', props?.selectedId ? props?.selectedId : param.id)
                setInitialValues((prev) => ({ ...prev, ...response?.data?.contact }))
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoding(false)
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [props?.selectedId, data])

    return (
        <div>
            <Drawer isOpen={props.isOpen} size={props.size}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader alignItems={"center"} justifyContent='space-between' display='flex' >
                        Edit Contact
                        <IconButton onClick={handleClose} icon={<CloseIcon />} />
                    </DrawerHeader>
                    <DrawerBody>
                        {isLoding ?
                            <Flex justifyContent={'center'} alignItems={'center'} width="100%" >
                                <Spinner />
                            </Flex>
                            :

                            <CustomForm moduleData={props.contactData} values={values} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />

                        }
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            sx={{ textTransform: "capitalize" }}
                            variant="brand"
                            type="submit" size="sm"
                            disabled={isLoding ? true : false}
                            onClick={handleSubmit}
                        >
                            {isLoding ? <Spinner /> : 'Update'}
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme='red' size="sm"
                            sx={{
                                marginLeft: 2,
                                textTransform: "capitalize",
                            }}
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Edit