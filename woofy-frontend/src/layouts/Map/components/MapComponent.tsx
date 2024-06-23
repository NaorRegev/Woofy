import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { icons } from './icons';
import { Business } from "../../../models/BusinessModels/BusinessModel";
import { useRouter } from "../../../routes/hooks";
import { fetchAverageReviews } from '../../../utils/reviews/reviews';

interface MapComponentProps {
    businesses: Business[];
}

const MapComponent: React.FC<MapComponentProps> = ({ businesses }) => {
    const router = useRouter();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);

    const generateStars = (rating: number) => {
        let stars = '';
        for (let i = 0; i < Math.floor(rating); i++) {
            stars += '<img class="h-[18.9px] w-5 relative min-h-[19px]" alt="" src="/vector.svg" />';
        }
        if (rating % 1 !== 0) {
            stars += '<img class="h-[18.9px] w-5 relative min-h-[19px]" alt="" src="/half-star.svg" />';
        }
        return stars;
    };

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = L.map(mapRef.current);
            mapInstance.current = map;

            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 16);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.marker([latitude, longitude], { icon: icons['Home'] }).addTo(map).bindTooltip('Your location');
            });
        }

        if (mapInstance.current && businesses.length > 0) {
            businesses.forEach((business) => {
                const marker = L.marker([business.lat, business.lon], { icon: icons['business general'] })
                    .addTo(mapInstance.current!)
                    .bindTooltip(business.businessName);

                marker.on('click', async () => {
                    const averageReview = await fetchAverageReviews(business.id);
                    const averageReviewText = averageReview === 0 || averageReview === undefined ? "No reviews yet" : (isNaN(averageReview!) ? "No reviews yet" : `${generateStars(averageReview)} ${averageReview}`);

                    const popupContent = `
              <div>
                  <h2 style="text-align: center; font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">${business.businessName}</h2>
                  <b>Owner:</b> ${business.firstName} ${business.lastName}<br />
                  <b>Phone number:</b> ${business.phoneNumber}<br />
                  <b>Address:</b> ${business.address}, ${business.city}<br />
                  <b>Rate:</b> ${averageReviewText}<br />
                  ${business.dogSitterEntity ? `<h3 style="text-align: center;">Dog Sitting</h3><p><b>About:</b> ${business.dogSitterEntity.about}</p><p><b>Price:</b> ${business.dogSitterEntity.price}</p>` : ''}
                  ${business.dogWalkerEntity ? `<h3 style="text-align: center;">Dog Walking</h3><p><b>About:</b> ${business.dogWalkerEntity.about}</p><p><b>Price:</b> ${business.dogWalkerEntity.price}</p>` : ''}
                  ${business.boardingEntity ? `<h3 style="text-align: center;">Boarding</h3><p><b>About:</b> ${business.boardingEntity.about}</p><p><b>Price:</b> ${business.boardingEntity.price}</p>` : ''}
                  ${business.dayCareEntity ? `<h3 style="text-align: center;">Day Care</h3><p><b>About:</b> ${business.dayCareEntity.about}</p><p><b>Price:</b> ${business.dayCareEntity.price}</p>` : ''}
                  <div style="text-align: center;">
                  <button style="background-color: #007bff; color: #fff; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-top: 8px;" 
                  onclick="handleAppointment('${business.id}')">Business Page</button>
              </div>
              `;

                    marker.bindPopup(popupContent).openPopup();
                });
            });
        }
    }, [businesses]);

    const handleAppointment = (businessId: string) => {
        router.push(`/business-profile/${businessId}`);
    };

    (window as any).handleAppointment = handleAppointment;

    return <div ref={mapRef} style={{ height: 700 }} />;
};

export default MapComponent;
