const leadFields = [
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