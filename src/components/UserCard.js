import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class UserCard extends React.Component {
    render() {
        return (
            <Card className="user-card">
                <CardActionArea>
                    <CardMedia className="card-media"
                        image={this.props.user.picture.large}
                    />
                    <CardContent className="card-content">
                        <Typography gutterBottom variant="h5" component="h4">
                            {this.props.user.name.first.charAt(0).toUpperCase() + this.props.user.name.first.slice(1) + ' ' + this.props.user.name.last.charAt(0).toUpperCase() + this.props.user.name.last.slice(1)}
                        </Typography>
                        <Typography component="p">
                            {this.props.user.email}
                        </Typography>
                        <Typography component="p">
                            {this.props.user.dob.date}
                        </Typography>
                        <Typography component="p">
                            Longitude: {this.props.user.location.coordinates.longitude}
                        </Typography>
                        <Typography component="p">
                            Latitude: {this.props.user.location.coordinates.latitude}
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions className="card-actions">
                    <Button size="small" color="primary">
                        Share
                            </Button>
                    <Button size="small" color="primary">
                        Learn More
                            </Button>
                </CardActions>
            </Card>
        );
    }
}

