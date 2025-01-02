const colors = {
	transparent: 'transparent',
	current: 'currentColor',
	black: '#000000',
	white: '#FFFFFF',
	whiteAlpha: {
		50: 'rgba(255, 255, 255, 0.04)',
		100: 'rgba(255, 255, 255, 0.06)',
		200: 'rgba(255, 255, 255, 0.08)',
		300: 'rgba(255, 255, 255, 0.16)',
		400: 'rgba(255, 255, 255, 0.24)',
		500: 'rgba(255, 255, 255, 0.36)',
		600: 'rgba(255, 255, 255, 0.48)',
		700: 'rgba(255, 255, 255, 0.64)',
		800: 'rgba(255, 255, 255, 0.80)',
		900: 'rgba(255, 255, 255, 0.92)',
	},
	blackAlpha: {
		50: 'rgba(0, 0, 0, 0.04)',
		100: 'rgba(0, 0, 0, 0.06)',
		200: 'rgba(0, 0, 0, 0.08)',
		300: 'rgba(0, 0, 0, 0.16)',
		400: 'rgba(0, 0, 0, 0.24)',
		500: 'rgba(0, 0, 0, 0.36)',
		600: 'rgba(0, 0, 0, 0.48)',
		700: 'rgba(0, 0, 0, 0.64)',
		800: 'rgba(0, 0, 0, 0.80)',
		900: 'rgba(0, 0, 0, 0.92)',
	},
	gray: {
		50: '#F4E0D9', // Chocolate Brown lighter shade
		100: '#E3C2B0', // Chocolate Brown mid shade
		200: '#D1A48A', // Chocolate Brown
		300: '#BF8764', // Chocolate Brown darker shade
		400: '#AD6A3E', // Chocolate Brown base
		500: '#8D6E63', // Chocolate Brown
		600: '#74584F', // Chocolate Brown dark shade
		700: '#5C423E', // Chocolate Brown darkest
		800: '#4B2F2B', // Chocolate Brown
		900: '#3A1D17', // Chocolate Brown darkest
	},
	red: {
		50: '#fee9e7',
		100: '#fbbcb7',
		200: '#faa69f',
		300: '#f89086',
		400: '#f77a6e',
		500: 'rgba(244, 77, 62, 1)',
		600: '#f1200e',
		700: '#d91d0c',
		800: '#c11a0b',
		900: '#911308',
	},
	orange: {
		50: '#FFFAF0',
		100: '#FFF6DA',
		200: '#FBD38D',
		300: '#F6AD55',
		400: '#ED8936',
		500: '#FFB547',
		600: '#C05621',
		700: '#9C4221',
		800: '#7B341E',
		900: '#652B19',
	},
	yellow: {
		50: '#FFFFF0',
		100: '#FEFCBF',
		200: '#FAF089',
		300: '#F6E05E',
		400: '#ECC94B',
		500: '#D69E2E',
		600: '#B7791F',
		700: '#975A16',
		800: '#744210',
		900: '#5F370E',
	},
	green: {
		50: '#b9f2dd',
		100: '#8ee9c8',
		200: '#79e5bd',
		300: '#63e1b3',
		400: '#4edda8',
		500: 'rgba(40, 208, 146, 1)',
		600: '#20a574',
		700: '#1c9065',
		800: '#187a56',
		900: '#0f5038',
	},
	teal: {
		50: '#E6FFFA',
		100: '#B2F5EA',
		200: '#81E6D9',
		300: '#4FD1C5',
		400: '#38B2AC',
		500: '#319795',
		600: '#2C7A7B',
		700: '#285E61',
		800: '#234E52',
		900: '#1D4044',
	},
	blue: {
		50: '#e0f9e8',
		100: '#b5f0c9',
		200: '#a0ecb9',
		300: '#8be8aa',
		400: '#76e49a',
		500: 'rgba(75, 219, 123, 1)',
		600: '#28ca5f',
		700: '#24b555',
		800: '#20a04b',
		900: '#177537',
	},
	cyan: {
		50: '#EDFDFD',
		100: '#C4F1F9',
		200: '#9DECF9',
		300: '#76E4F7',
		400: '#0BC5EA',
		500: '#00B5D8',
		600: '#00A3C4',
		700: '#0987A0',
		800: '#086F83',
		900: '#065666',
	},
	purple: {
		50: '#aee2c9',
		100: '#89d4b0',
		200: '#76cda4',
		300: '#63c697',
		400: '#51bf8b',
		500: 'rgba(59, 162, 113, 1)',
		600: '#2d7d57',
		700: '#276a4a',
		800: '#20573d',
		900: '#123223',
	},
	pink: {
		50: '#ffffff',
		100: '#fbd7e9',
		200: '#f8c0dd',
		300: '#f6a8d0',
		400: '#f491c4',
		500: 'rgba(239, 99, 171, 1)',
		600: '#ea3592',
		700: '#e81e86',
		800: '#d61679',
		900: '#a8115f',
	},
	linkedin: {
		50: '#E8F4F9',
		100: '#CFEDFB',
		200: '#9BDAF3',
		300: '#68C7EC',
		400: '#34B3E4',
		500: '#00A0DC',
		600: '#008CC9',
		700: '#0077B5',
		800: '#005E93',
		900: '#004471',
	},
	facebook: {
		50: '#E8F4F9',
		100: '#D9DEE9',
		200: '#B7C2DA',
		300: '#6482C0',
		400: '#4267B2',
		500: '#385898',
		600: '#314E89',
		700: '#29487D',
		800: '#223B67',
		900: '#1E355B',
	},
	messenger: {
		50: '#D0E6FF',
		100: '#B9DAFF',
		200: '#A2CDFF',
		300: '#7AB8FF',
		400: '#2E90FF',
		500: '#0078FF',
		600: '#0063D1',
		700: '#0052AC',
		800: '#003C7E',
		900: '#002C5C',
	},
	whatsapp: {
		50: '#dffeec',
		100: '#b9f5d0',
		200: '#90edb3',
		300: '#65e495',
		400: '#3cdd78',
		500: '#22c35e',
		600: '#179848',
		700: '#0c6c33',
		800: '#01421c',
		900: '#001803',
	},
	twitter: {
		50: '#E5F4FD',
		100: '#C8E9FB',
		200: '#A8DCFA',
		300: '#83CDF7',
		400: '#57BBF5',
		500: '#1DA1F2',
		600: '#1A94DA',
		700: '#1681BF',
		800: '#136B9E',
		900: '#0D4D71',
	},
	telegram: {
		50: '#E3F2F9',
		100: '#C5E4F3',
		200: '#A2D4EC',
		300: '#7AC1E4',
		400: '#47A9DA',
		500: '#0088CC',
		600: '#007AB8',
		700: '#006BA1',
		800: '#005885',
		900: '#003F5E',
	},
	brand: {
		50: '#F4E0D9', // Chocolate Brown lighter shade
		100: '#E3C2B0', // Chocolate Brown mid shade
		200: '#D1A48A', // Chocolate Brown
		300: '#BF8764', // Chocolate Brown darker shade
		400: '#AD6A3E', // Chocolate Brown base
		500: '#8D6E63', // Chocolate Brown
		600: '#74584F', // Chocolate Brown dark shade
		700: '#5C423E', // Chocolate Brown darkest
		800: '#4B2F2B', // Chocolate Brown
		900: '#3A1D17', // Chocolate Brown darkest
	},
	brandScheme: {
		50: '#7959f5',
		100: '#5229f2',
		200: '#3e11f0',
		300: '#370dda',
		400: '#310cc2',
		500: 'rgba(37, 9, 146, 1)',
		600: '#190662',
		700: '#13054a',
		800: '#0d0332',
		900: '#000002',
	},
	brandTabs: {
		50: '#270bff',
		100: '#1800d7',
		200: '#1600be',
		300: '#1300a4',
		400: '#10008b',
		500: 'rgba(10, 0, 88, 1)',
		600: '#040025',
		700: '#01000b',
		800: '#000000',
		900: '#000000',
	},
	secondaryGray: {
		50: '#FAF4EF', // Off-White Cream light shade
		100: '#F1E6D3', // Off-White Cream mid shade
		200: '#E9D8B8', // Off-White Cream
		300: '#D9C59D', // Off-White Cream darker shade
		400: '#C9B284', // Off-White Cream base
		500: '#FAF4EF', // Off-White Cream
		600: '#C6B199', // Off-White Cream dark shade
		700: '#B59F7E', // Off-White Cream darkest
		800: '#A38D64', // Off-White Cream darkest shade
		900: '#8C7A52', // Off-White Cream darkest
	},
	navy: {
		50: '#F4E0D9', // Chocolate Brown lighter shade
		100: '#E3C2B0', // Chocolate Brown mid shade
		200: '#D1A48A', // Chocolate Brown
		300: '#BF8764', // Chocolate Brown darker shade
		400: '#AD6A3E', // Chocolate Brown base
		500: '#8D6E63', // Chocolate Brown
		600: '#74584F', // Chocolate Brown dark shade
		700: '#5C423E', // Chocolate Brown darkest
		800: '#4B2F2B', // Chocolate Brown
		900: '#3A1D17', // Chocolate Brown darkest
	},
}

export default colors;
