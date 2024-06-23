import L from 'leaflet';
import PetsIcon from '@mui/icons-material/Pets';

const myAPIKey = '0b82b699ae414ddf9bb1e89d9ecf3ef4'

export const icons: { [key: string]: L.Icon } = {
    'Home': new L.Icon({
        iconUrl: 'https://img.icons8.com/pulsar-color/48/home-page.png',
        iconSize: [35, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    }),
    'business general': new L.Icon({
        iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=%233e9cfe&icon=paw&apiKey=${myAPIKey}`,
        iconSize: [31, 46], // size of the icon
        iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
    })
};