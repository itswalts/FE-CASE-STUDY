import styleUserInfoCard from './UserInfoCard.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function UserInfoCard() {
    const [imgUrl, setImgUrl] = useState('');
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (user && user.id) {
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                    const data = await response.json();
                    if (data && data.length > 0) {
                        const userPhoto = data[user.id % data.length];
                        setImgUrl(userPhoto.url);
                    }
                } catch (error) {
                    console.error('Error fetching photo:', error);
                }
            }
        };

        fetchPhoto();
    }, [user]);

    return (
        <div className={styleUserInfoCard.cardContainer}>
            {imgUrl ? (
                <img src={imgUrl} alt="User placeholder" className={styleUserInfoCard.profileImage} />
            ) : (
                <p>Loading image...</p>
            )}
            <div className={styleUserInfoCard.userInfo}>
                <p>Nome: {user.name}</p>
                <p>Cognome: {user.lastName}</p>
                <p>Email: {user.email}</p>
                {role.includes('admin') &&
                    <p>Ruolo: ADMIN</p>
                }
                
            </div>
        </div>
    );
}