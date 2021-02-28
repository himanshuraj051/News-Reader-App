import React, {useEffect, useState, createRef} from 'react';
import useStyles from './styles';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classNames from 'classnames';

const NewsCard = ({article: {description, publishedAt, source, title, url, urlToImage}, i, activeArticle}) => {
    const classes = useStyles();
    const [eleRefs, setEleRefs] = useState([]);

    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setEleRefs((refs) => Array(20).fill().map((_,j) => refs[j] || createRef()));
    },[]);

    useEffect(() => {
        if(i === activeArticle && eleRefs[activeArticle]) {
            scrollToRef(eleRefs[activeArticle]);
        }
    },[i,activeArticle,eleRefs]);


    return (
         <Card ref={eleRefs[i]} className = {classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
             <CardActionArea href={url} target="_blank">
                 <CardMedia className={classes.media} image={urlToImage || 'https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png'}/>
                 <div className={classes.details}>
                     <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                     <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                 </div>
                 <Typography className={classes.title} gutterBottom variant="h5"></Typography>
                 <CardContent>
                     <Typography variant="body2" color="textSecondary" component="p">{title}</Typography>
                 </CardContent>
             </CardActionArea>
             <CardActions className={classes.cardActions}>
                 <Button size="small" color="primary">Learn More</Button>
                 <Typography variant="h5" color="textSecondary">{i+1}</Typography>
             </CardActions>
         </Card>
    )
}

export default NewsCard;

