import laptopData from './ea_laptop_data.json';
import monitorData from './ea_monitor_data.json';
import dockingStationData from './ea_dockingStation_data.json';
import headsetData from './ea_headset_data.json';
import mouseKeyboardData from './ea_mouse_keyboard_data.json';
import webcamData from './ea_webcams.json';
import { EAProductData } from '../types';

// Consolidate all EA product data
export const eaProductData: EAProductData = {
  laptops: laptopData,
  monitors: monitorData,
  dockingStations: dockingStationData,
  headsets: headsetData,
};

// Export individual data for backward compatibility
export const hardwareData = [...laptopData, ...monitorData, ...dockingStationData, ...headsetData, ...mouseKeyboardData, ...webcamData];
export const monitorDataExport = monitorData;
export const headphoneData = headsetData;
export const dockStationData = dockingStationData;

// Add missing exports that other files expect
export const mouseData = mouseKeyboardData.filter(item => 
  item.category === 'Mouse' || item.category === 'TrackPad'
);
export const keyboardData = mouseKeyboardData.filter(item => 
  item.category === 'Keyboard'
);
export const mouseKeyboardComboData = mouseKeyboardData.filter(item => 
  item.category === 'Mouse & Keyboard'
);
export const webcamDataExport = webcamData;
export const backpackData: any[] = [];

// Create categories based on available data
export const categories = [
  {
    id: 1,
    name: 'Laptops',
    iconName: 'laptop',
    itemQuantity: laptopData.length,
  },
  {
    id: 2,
    name: 'Monitors',
    iconName: 'monitor',
    itemQuantity: monitorData.length,
  },
  {
    id: 3,
    name: 'Docking Stations',
    iconName: 'dock',
    itemQuantity: dockingStationData.length,
  },
  {
    id: 4,
    name: 'Headsets',
    iconName: 'headphones',
    itemQuantity: headsetData.length,
  },
  {
    id: 5,
    name: 'Mice',
    iconName: 'mouse',
    itemQuantity: mouseData.length,
  },
  {
    id: 6,
    name: 'Keyboards',
    iconName: 'keyboard',
    itemQuantity: keyboardData.length,
  },
  {
    id: 7,
    name: 'Mouse & Keyboard',
    iconName: 'mouse-pointer',
    itemQuantity: mouseKeyboardComboData.length,
  },
  {
    id: 8,
    name: 'Webcams',
    iconName: 'video',
    itemQuantity: webcamData.length,
  },
];

// Create quick actions
export const quickActions = [
  {
    id: 1,
    icon: 'search',
    title: 'Find Hardware',
    description: 'Search for specific hardware requirements',
  },
  {
    id: 2,
    icon: 'compare',
    title: 'Compare Products',
    description: 'Compare different hardware options',
  },
  // Cart functionality removed
  {
    id: 4,
    icon: 'help',
    title: 'Get Help',
    description: 'Contact support for assistance',
  },
];

// Create sample eligibility data
export const eligibilityData = {
  department: 'Engineering',
  role: 'Software Developer',
  location: 'Vancouver',
  refreshCycle: '3 years',
  approvals: 'Manager approval required',
};
