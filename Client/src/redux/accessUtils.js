import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "./roleSlice";

export const HasAccess = (actions) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname === "/default") {
            dispatch(fetchRoles(user?._id));
        }
    }, [dispatch]);

    const roles = useSelector((state) => state?.roles?.roles);

    // Helper function to convert a string to a slug (lowercase with hyphens)
    const toSlug = (str) => {
        return str
            .toLowerCase()        // Convert to lowercase
            .replace(/\s+/g, '-')  // Replace spaces with hyphens
            .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters
            .replace(/--+/g, '-')  // Replace multiple hyphens with one
            .trim();              // Trim any leading or trailing hyphens
    };

    // Helper function to convert a slug (action) to a capitalized title (e.g., 'personal-leads' -> 'Personal Leads')
    const toTitleCase = (str) => {
        return str
            .split('-')            // Split the string by hyphen
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' ');            // Join the words with spaces
    };

    // Initialize merged permissions
    let mergedPermissions = {};

    // Iterate through the provided actions
    actions?.forEach(action => {
        const actionSlug = toSlug(action);  // Ensure action is in slug format

        // Iterate through roles and check the access
        roles?.forEach(role => {
            const access = role?.access?.find(permission => {
                const titleSlug = toSlug(permission?.title); // Convert title to slug format
                return titleSlug === actionSlug;
            });

            if (access) {
                // Destructure permission if it's found
                const { title, ...rest } = access;

                if (!mergedPermissions[title]) {
                    mergedPermissions[title] = { ...rest };
                } else {
                    // Merge with priority to true values
                    Object.keys(rest).forEach(key => {
                        if (mergedPermissions[title][key] !== true) {
                            mergedPermissions[title][key] = rest[key];
                        }
                    });
                }
            }
        });
    });

    // SuperAdmin permission object, if the user has this role, return full access
    const superAdminPermission = {
        "create": true,
        "update": true,
        "delete": true,
        "view": true,
        "import": true,
        "export": true,
    };

    // Check each action's permission for the user
    return actions.map(action => {
        // If the user is a superAdmin, return superAdminPermission
        return user?.role === "superAdmin" ? superAdminPermission : mergedPermissions[toTitleCase(action)];
    });
};
