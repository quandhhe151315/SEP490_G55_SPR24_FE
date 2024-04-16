import React from 'react';
import { Button, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useGetAdvertisement } from '../../../hook/useGetAdvertisement';

export default function CarouselItem(props) {
    const { advertisementList } = useGetAdvertisement();
      

    return (
        
        <Carousel>
             {
                advertisementList?.map( (item, i) => <Item key={i} item={item} /> )
            } 
            
        </Carousel>
    )
}

function Item(props) {
    return (
        <Paper sx={{height:'500px'}}>
            <img src={props.item?.advertisementImage} alt="Ảnh về tin tức của bài viết" style={{width:'100%',height:'100%', objectFit: 'cover'}}/>
        </Paper>
    );
}
