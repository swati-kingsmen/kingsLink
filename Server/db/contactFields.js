// const contactFields = [
//     {
//         "name": "email",
//         "label": "Email",
//         "type": "email",
//         "fixed": true,
//         "delete": false,
//         "belongsTo": null,
//         "backendType": "String",
//         "isTableField": true,
//         "options": [],
//         "validation": [
//             {
//                 "require": true,
//                 "message": "",
//             },
//         ],
//     },
//     {
//         "name": "ContactName",
//         "label": "Name",
//         "type": "text",
//         "fixed": true,
//         "delete": false,
//         "belongsTo": null,
//         "backendType": "String",
//         "isTableField": true,
//         "options": [],
//         "validation": [
//             {
//                 "require": true,
//                 "message": "",
//             },
//         ],
//     },
//     {
//         "name": "leadStatus",
//         "label": "Lead Status",
//         "type": "select",
//         "fixed": false,
//         "delete": false,
//         "belongsTo": null,
//         "backendType": "Mixed",
//         "isTableField": true,
//         "options": [
//             {
//                 "name": "Active",
//                 "value": "active",
//             },
//             {
//                 "name": "Pending",
//                 "value": "pending",
//             },
//             {
//                 "name": "Sold",
//                 "value": "sold",
//             }
//         ],
//         "validation": [
//             {
//                 "message": "Invalid type value for Lead Status",
//                 "formikType": "String",
//             }
//         ],
//     },
//     // {
//     //     "name": "facebookProfile",
//     //     "label": "Facebook",
//     //     "type": "url",
//     //     "fixed": true,
//     //     "delete": false,
//     //     "belongsTo": null,
//     //     "backendType": "Mixed",
//     //     "isTableField": false,
//     //     "validation": [
//     //         {
//     //             "message": "Invalid type value for facebook",
//     //             "formikType": "url",
//     //         }
//     //     ],
//     // },
//     // {
//     //     "name": "linkedInProfile",
//     //     "label": "LinkedIn Profile URL",
//     //     "type": "url",
//     //     "fixed": true,
//     //     "delete": false,
//     //     "belongsTo": null,
//     //     "backendType": "Mixed",
//     //     "isTableField": false,
//     //     "validation": [
//     //         {
//     //             "message": "Invalid type value for LinkedIn Profile URL",
//     //             "formikType": "url",
//     //         }
//     //     ],
//     // },
//     // {
//     //     "name": "twitterHandle",
//     //     "label": "Twitter Username",
//     //     "type": "url",
//     //     "fixed": true,
//     //     "delete": false,
//     //     "belongsTo": null,
//     //     "backendType": "Mixed",
//     //     "isTableField": false,
//     //     "validation": [
//     //         {
//     //             "message": "Invalid type value for Twitter Username",
//     //             "formikType": "url",
//     //         }
//     //     ],
//     // },
//     // {
//     //     "name": "otherProfiles",
//     //     "label": "Other Social Media Profiles URL",
//     //     "type": "url",
//     //     "fixed": true,
//     //     "delete": false,
//     //     "belongsTo": null,
//     //     "backendType": "Mixed",
//     //     "isTableField": false,
//     //     "validation": [
//     //         {
//     //             "message": "Invalid type value for Other Social Media Profiles URL",
//     //             "formikType": "url",
//     //         }
//     //     ],
//     // },
//     {
//         "name": "phoneNumber",
//         "label": "Phone Number",
//         "type": "tel",
//         "fixed": true,
//         "delete": false,
//         "belongsTo": null,
//         "backendType": "Number",
//         "isTableField": true,
//         "options": [],
//         "validation": [
//             {
//                 "require": true,
//                 "message": "",
//             },
//         ],
//     },
// ];
// exports.contactFields = contactFields;
const contactFields = [
    {
        "name": "ContactName",
        "label": "Name",
        "type": "text",
        "fixed": true,
        "delete": false,
        "belongsTo": null,
        "backendType": "String",
        "isTableField": true,
        "options": [],
        "validation": [
            {
                "require": true,
                "message": "",
            },
        ],
    },
    {
        "name": "phoneNumber",
        "label": "Phone Number",
        "type": "tel",
        "fixed": true,
        "delete": false,
        "belongsTo": null,
        "backendType": "Number",
        "isTableField": true,
        "options": [],
        "validation": [
            {
                "require": true,
                "message": "",
            },
        ],
    },
    {
        "name": "email",
        "label": "Email",
        "type": "email",
        "fixed": true,
        "delete": false,
        "belongsTo": null,
        "backendType": "String",
        "isTableField": true,
        "options": [],
        "validation": [
            {
                "require": true,
                "message": "",
            },
        ],
    },
    {
        "name": "leadStatus",
        "label": "Lead Remark",
        "type": "select",
        "fixed": false,
        "delete": false,
        "belongsTo": null,
        "backendType": "Mixed",
        "isTableField": true,
        "options": [
            {
                "name": "RNR", 
                "value": "cold",
            },
            {
                "name": "Not Interested", 
                "value": "cold",
            },
            {
                "name": "Busy", 
                "value": "cold",
            },
            {
                "name": "Not Reachable",
                "value": "cold",
            },
            {
                "name": "Follow Up", 
                "value": "warm",
            },
            {
                "name": "Site Visit Scheduled", 
                "value": "warm",
            },
            {
                "name": "Site Visited Done", 
                "value": "hot",
            },
          
        ],
        "validation": [
            {
                "message": "Invalid type value for Lead Status",
                "formikType": "String",
            }
        ],
    },
];
exports.contactFields = contactFields;