export const locationRangeOptions = [
    { value: -1, label: 'Anywhere' },
    { value: 8046.72, label: '5 mi' },
    { value: 24140.2, label: '15 mi' },
    { value: 80467.2, label: '50 mi' }
]

//these won't do anything becauase there is
//no correlation in the design between "Italian Cuisine"
//and the search results
export const ideaBoxOptions = [
    { value: '', label: 'Italian Cuisine' },
    { value: '', label: 'Random String' },
    { value: '', label: 'No String?' }
];

export const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'online', label: 'Online' },
    { value: 'away', label: 'Away' },
    { value: 'offline', label: 'Offline' }
];

export const genderOptions = [
    { value: 'all', label: 'All' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
];

//no value will be sent so let's add min and max to simplify
export const ageOptions = [
    { value: 'all', min: 0, max: 150, label: 'All' },
    { value: '', min: 13, max: 17, label: '13 - 17' },
    { value: '', min: 18, max: 25, label: '18 - 25' },
    { value: '', min: 26, max: 35, label: '26 - 35' },
    { value: '', min: 36, max: 49, label: '36 - 49' },
    { value: '', min: 50, max: 150, label: '50+' }
];