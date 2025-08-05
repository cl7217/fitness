import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MyCard from '../user/packageCard'
import { fetchGetPackages } from './packageSlice';
import { Button, CircularProgress, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import '../../css/packageList.css'
import '../../css/history.css'



export default function PackageList() {

    const images = ['../../p.jpg', '../../ball.jpg', '../../adidas.png'];
    const dispatch = useDispatch();




    useEffect(() => {
        dispatch(fetchGetPackages());
    }, [dispatch]);


    const { packages = [], loading, error } = useSelector((state) => state.package);

    if (loading) return <CircularProgress sx={{ color: orange[800] }} />;
    //  if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Typography className="history-title" >
                Packages List</Typography>
            <div className='packageList-list'>
                {packages.map((pkg, index) => (
                    <MyCard
                        img={images[index]}
                        name={pkg.name}
                        qty={pkg.qty}
                        price={pkg.price}
                        code={pkg.code}
                        key={pkg.code}
                    />
                ))}
            </div>
        </>
    );
}