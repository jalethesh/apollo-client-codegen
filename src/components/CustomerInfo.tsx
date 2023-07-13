import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useGetUserQuery } from '../types/graphql';
import { Maybe } from '../types/graphql';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface CustomerInfoProps {
  userId: Maybe<number> | undefined;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(-90deg)' : 'rotate(90deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CustomerInfo(props: CustomerInfoProps) {
  const { userId } = props;

  const [expanded, setExpanded] = useState(false);

  const {
    loading: loadingNames,
    error: errorNames,
    data: dataUser,
  } = useGetUserQuery({
    variables: { userId: userId },
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: { xs: 'auto', sm: '0' },
        marginTop: { xs: 3, sm: '0' },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: blue[500] }}
            aria-label="recipe"
            src="https://media.istockphoto.com/photos/silhouette-of-a-businessman-for-use-as-a-profile-picture-picture-id474001632?k=20&m=474001632&s=612x612&w=0&h=9DzXL2UkJ6matnio0Yu2hpMu3hZb6Vrpr0cSYCqyFAQ="
          >
            A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={loadingNames ? 'loading...' : dataUser?.user?.username}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Typography>10</Typography>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Typography>0</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
