const leadFields = [
{
    "name": "leadName",
    "label": "Lead Name",
    "type": "name",
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
    "name": "leadEmail",
    "label": "Lead Email",
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
    "name": "leadPhoneNumber",
    "label": "Lead Phone Number",
    "type": "tel",
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
        "name": "leadRemark",
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
                "value": "rnr",
            },
            {
                "name": "Not Interested", 
                "value": "notInterested",
            },
            {
                "name": "Busy", 
                "value": "busy",
            },
            {
                "name": "Not Reachable",
                "value": "notReachable",
            },
            {
                "name": "Follow Up", 
                "value": "followUp",
            },
            {
                "name": "Site Visit Schedule", 
                "value": "visitScheduled",
                "requiresDatePicker": true,
            },
            {
                "name": "Site Visited Done", 
                "value": "visitedDone",
            },
            {
                "name": "Booking Done", 
                "value": "bookingDone",
            },
            {
                "name": "Site Visit Reschedule", 
                "value": "visitReschedule",
                "requiresDatePicker": true,
            },
            {
                "name": "Video Call Schedule", 
                "value": "videoCallScheduled",
                "requiresDatePicker": true,
            },
            {
                "name": "Video Call Reschedule", 
                "value": "videoCallReschedule",
                "requiresDatePicker": true,
            },
            {
                "name": "Currenlty Not Interested", 
                "value": "currentlyNotInterested",
            },
            {
                "name": "Lead Lost",
                "value": "leadLost",
            }
          
        ],
        "validation": [
            {
                "message": "Invalid type value for Lead Remark",
                "formikType": "String",
            }
        ],
    },
    {
        "name": "leadStatus",
        "label": "Lead Status",
        "type": "select",
        "fixed": false,
        "delete": false,
        "belongsTo": null,
        "backendType": "Mixed",
        "isTableField": true,
        "options": [
            {
                "name": "HOT",
                "value": "hot",
            },
            {
                "name": "WARM",
                "value": "warm",
            },
            {
                "name": "COLD",
                "value": "cold",
            }
        ],
        "validation": [
            {
                "message": "Invalid type value for Lead Status",
                "formikType": "String",
            }
        ],
    },
    {
        "name": "origin",
        "label": "Lead Origin",
        "type": "select",
        "fixed": false,
        "delete": false,
        "belongsTo": null,
        "backendType": "Mixed",
        "isTableField": true,
        "options": [
          
            {
                "name": "Marketing", 
                "value": "marketing",
            },
            {
                "name": "Housing", 
                "value": "housing",
            },
            {
                "name": "Website",
                "value": "website",
            },
            {
                "name": "Others", 
                "value": "others",
            },
           
           
          
        ],
        "validation": [
            {
                "message": "Invalid type value for Lead Status",
                "formikType": "String",
            }
        ],
    },

    {
        name: "budget",
        label: "Budget",
        type: "number",
        fixed: false,
        delete: false,
        belongsTo: null,
        backendType: "Number",
        isTableField: true,
        options: [],
        validation: [
            {
                require: true,
                message: "Budget is required",
            },
        ],
    },
    {
        name: "type",
        label: "Type",
        type: "select",
        fixed: false,
        delete: false,
        belongsTo: null,
        backendType: "String",
        isTableField: true,
        options: [
            { name: "Apartment", value: "apartment" },
            { name: "Independent House", value: "independent_house" },
            { name: "Villas", value: "villas" },
        ],
        validation: [
            {
                require: true,
                message: "Type is required",
            },
        ],
    },
    {
        name: "location",
        label: "Location",
        type: "location",
        fixed: false,
        delete: false,
        belongsTo: null,
        backendType: "String",
        isTableField: true,
        "options": [],
        validation: [
            {
                require: true,
                message: "Location is required",
            },
        ],
    },
];

exports.leadFields = leadFields;