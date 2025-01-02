// import { mode } from "@chakra-ui/theme-tools";
// export const globalStyles = {
//   colors: {
//     brand: {
//       100: "#E9E3FF",
//       200: "#422AFB",
//       300: "#422AFB",
//       400: "#7551FF",
//       500: "#422AFB",
//       600: "#3311DB",
//       700: "#02044A",
//       800: "#190793",
//       900: "#11047A",
//     },
//     brandScheme: {
//       100: "#E9E3FF",
//       200: "#7551FF",
//       300: "#7551FF",
//       400: "#7551FF",
//       500: "#422AFB",
//       600: "#",
//       700: "#02044A",
//       800: "#190793",
//       900: "#02044A",
//     },
//     brandTabs: {
//       100: "#E9E3FF",
//       200: "#422AFB",
//       300: "#422AFB",
//       400: "#422AFB",
//       500: "#422AFB",
//       600: "#3311DB",
//       700: "#02044A",
//       800: "#190793",
//       900: "#02044A",
//     },
//     secondaryGray: {
//       100: "#E0E5F2",
//       200: "#E1E9F8",
//       300: "#F4F7FE",
//       400: "#E9EDF7",
//       500: "#8F9BBA",
//       600: "#A3AED0",
//       700: "#707EAE",
//       800: "#707EAE",
//       900: "#1B2559",
//     },
//     red: {
//       100: "#FEEFEE",
//       300: "#eb7b74",
//       500: "#EE5D50",
//       600: "#E31A1A",
//     },
//     blue: {
//       50: "#EFF4FB",
//       500: "#3965FF",
//     },
//     orange: {
//       100: "#FFF6DA",
//       400: "#fde04ce8",
//       500: "#FFB547",
//     },
//     green: {
//       100: "#E6FAF5",
//       500: "#01B574",
//     },
//     navy: {
//       50: "#d0dcfb",
//       100: "#aac0fe",
//       200: "#a3b9f8",
//       300: "#728fea",
//       400: "#3652ba",
//       500: "#1b3bbb",
//       600: "#24388a",
//       700: "#1B254B",
//       800: "#111c44",
//       900: "#0b1437",
//     },
//     gray: {
//       100: '#FAFCFE',
//       200: '#E2E8F0',
//       300: '#CBD5E0',
//       400: '#A0AEC0',
//       500: '#718096',
//       600: '#4A5568',
//       700: '#2D3748',
//       800: '#1A202C',
//       900: '#171923',
//     },
//   },
//   styles: {
//     global: (props) => ({
//       body: {
//         overflowX: "hidden",
//         bg: mode("secondaryGray.300", "navy.900")(props),
//         fontFamily: "Inter,sans-serif",
//         letterSpacing: "-0.5px",
//       },
//       input: {
//         color: "gray.700",
//       },
//       html: {
//         fontFamily: "Inter,sans-serif",
//       },
//     }),
//   },
// };
import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    brand: {
      100: "#E9E3FF",
      200: "#8D6E63",
      300: "#8D6E63",
      400: "#8D6E63",
      500: "#8D6E63",
      600: "#2C2C2C",
      700: "#2C2C2C", // Primary: Graphite Black
      800: "#8D6E63", // Accent: Chocolate Brown
      900: "#8D6E63", // Accent: Chocolate Brown
    },
    brandScheme: {
      100: "#FAF4EF", // Background: Off-White Cream
      200: "#D7CCC8", // Secondary: Taupe Gray
      300: "#8D6E63", // Accent: Chocolate Brown
      400: "#8D6E63", // Accent: Chocolate Brown
      500: "#2C2C2C", // Primary: Graphite Black
      600: "#000000", // Text: True Black
      700: "#2C2C2C", // Primary: Graphite Black
      800: "#8D6E63", // Accent: Chocolate Brown
      900: "#8D6E63", // Accent: Chocolate Brown
    },
    brandTabs: {
      100: "#FAF4EF", // Background: Off-White Cream
      200: "#8D6E63", // Accent: Chocolate Brown
      300: "#8D6E63", // Accent: Chocolate Brown
      400: "#8D6E63", // Accent: Chocolate Brown
      500: "#2C2C2C", // Primary: Graphite Black
      600: "#000000", // Text: True Black
      700: "#D7CCC8", // Secondary: Taupe Gray
      800: "#8D6E63", // Accent: Chocolate Brown
      900: "#8D6E63", // Accent: Chocolate Brown
    },
    secondaryGray: {
      100: "#D7CCC8", // Secondary: Taupe Gray
      200: "#FAF4EF", // Background: Off-White Cream
      300: "#FAF4EF", // Background: Off-White Cream
      400: "#D7CCC8", // Secondary: Taupe Gray
      500: "#8D6E63", // Accent: Chocolate Brown
      600: "#2C2C2C", // Primary: Graphite Black
      700: "#2C2C2C", // Primary: Graphite Black
      800: "#2C2C2C", // Primary: Graphite Black
      900: "#000000", // Text: True Black
    },
    red: {
      100: "#FEEFEE",
      300: "#eb7b74",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#FAF4EF", // Background: Off-White Cream
      500: "#8D6E63", // Accent: Chocolate Brown
    },
    orange: {
      100: "#FFF6DA",
      400: "#fde04ce8",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#FAF4EF", // Background: Off-White Cream
      100: "#D7CCC8", // Secondary: Taupe Gray
      200: "#D7CCC8", // Secondary: Taupe Gray
      300: "#8D6E63", // Accent: Chocolate Brown
      400: "#8D6E63", // Accent: Chocolate Brown
      500: "#8D6E63", // Accent: Chocolate Brown
      600: "#2C2C2C", // Primary: Graphite Black
      700: "#2C2C2C", // Primary: Graphite Black
      800: "#2C2C2C", // Primary: Graphite Black
      900: "#000000", // Text: True Black
    },
    gray: {
      100: "#FAF4EF", // Background: Off-White Cream
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "Inter, sans-serif",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "Inter, sans-serif",
      },
    }),
  },
};
