import React from 'react';
import { Button, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function CarouselItem(props) {
    var items = [
        {
          name: "Random Name #1",
          description: "Probably the most random thing you have ever seen!",
          imageUrl: "https://sohanews.sohacdn.com/zoom/480_300/160588918557773824/2024/3/20/an-bao-lau-nay-ban-co-biet-bun-dau-mam-tom-la-dac-san-o-dau-202206021309408488-171097871065493509511-0-0-442-707-crop-1710978866175638707837.jpeg" // Thêm URL của hình ảnh 1 vào đây
        },
        {
          name: "Random Name #2",
          description: "Hello World!",
          imageUrl: "https://nqs.1cdn.vn/thumbs/720x480/2023/12/29/dautu.kinhtechungkhoan.vn-stores-news_dataimages-2023-122023-28-15-_cover-ds20231228150107.jpg" // Thêm URL của hình ảnh 2 vào đây
        }
      ];
      

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <Paper sx={{height:'500px'}}>
            <img src={props.item.imageUrl} alt="Ảnh về tin tức của bài viết" style={{width:'100%',height:'100%', objectFit: 'cover'}}/>
        </Paper>
    );
}
